"""Authentication utility functions."""

from typing import Annotated

from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer

import jwt
from jwt.exceptions import InvalidTokenError

from pwdlib import PasswordHash

from ..models import TokenData, UserInDB, User
from ..services import UserService


ALGORITHM = "HS256"
SECRET_KEY = "781c0e1e43eec148e05253b6941f2a8fe46b2d5ba40a163e6a9f422851f7d059"  # TODO: Delete later

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

password_hash = PasswordHash.recommended()

DUMMY_HASH = password_hash.hash("dummypassword")

user_service = UserService()


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> UserInDB | None:
    """Get the current user.

    Decodes the JWT token and returns the user object if it exists.

    Args:
        token: JWT token to be decoded.

    Returns:
        The user object if it exists.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = user_service.get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)]):
    """Get the current active user.

    Returns the user object if the user is active.

    Args:
        current_user: The user object to be returned.

    Returns:
        A user object if the user is active.
    """
    if current_user.disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
    return current_user


def verify_password(plain_password: str, hashed_password: str):
    """Verify if the password matches the hashed password.

    Args:
        plain_password: The password to be verified.
        hashed_password: The hashed password.

    Returns:
        True if the passwords match, False otherwise.
    """
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password: str):
    """Hash the password.

    Args:
        password: Plain password to be hashed.

    Returns:
        Hash of the password.
    """
    return password_hash.hash(password)


def authenticate_user(username: str, password: str):
    """Authenticate a user with the given username and password.

    Args:
        username: The user's username.
        password: The user's password.

    Returns:
        If the user is authenticated, return a User object.
    """
    user = user_service.get_user(username)
    if not user:
        # Measure against timing attacks; attackers could else guess usernames
        verify_password(password, DUMMY_HASH)
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Create an access token.

    Args:
        data: A dictionary containing the data to be encoded.
        expires_delta: Time until the access token expires.

    Returns:
        An access token.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
