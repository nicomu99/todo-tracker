"""Authentication service."""

from datetime import datetime, timedelta, timezone

import jwt
from jwt.exceptions import InvalidTokenError

from pwdlib import PasswordHash

from ..models import TokenData
from ..repositories import UserRepository


class AuthenticationService:
    """Service for handling user authentication and access tokens."""

    def __init__(self, user_repository: UserRepository) -> None:
        """Initialize the authentication service.

        Args:
            user_repository: Repository used to retrieve user data.
        """
        self.password_hash = PasswordHash.recommended()
        self.user_repository = user_repository

        self.dummy_hash = self.password_hash.hash("dummypassword")
        self.secret_key = "781c0e1e43eec148e05253b6941f2a8fe46b2d5ba40a163e6a9f422851f7d059"
        self.algorithm = "HS256"

    def verify_password(self, plain_password: str, hashed_password: str):
        """Verify if the password matches the hashed password.

        Args:
            plain_password: The password to be verified.
            hashed_password: The hashed password.

        Returns:
            True if the passwords match, False otherwise.
        """
        return self.password_hash.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str):
        """Hash the password.

        Args:
            password: Plain password to be hashed.

        Returns:
            Hash of the password.
        """
        return self.password_hash.hash(password)

    def authenticate_user(self, username: str, password: str):
        """Authenticate a user with the given username and password.

        Args:
            username: The user's username.
            password: The user's password.

        Returns:
            If the user is authenticated, return a User object.
        """
        user = self.user_repository.get_user(username)
        if not user:
            # Measure against timing attacks; attackers could else guess usernames
            self.verify_password(password, DUMMY_HASH)
            return False
        if not self.verify_password(password, user.hashed_password):
            return False
        return user

    def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
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
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def get_user_from_token(self, token: str):
        """Retrieve the user associated with an access token.

        The token is decoded and its subject claim is used to look up the
        corresponding user.

        Args:
            token: JWT access token to be decoded.

        Returns:
            The user associated with the token, or None if the token is
            invalid or no corresponding user exists.
        """
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            username = payload.get("sub")
            if username is None:
                return None
            token_data = TokenData(username=username)
        except InvalidTokenError:
            return None

        if token_data.username is None:
            return None
        user = self.user_repository.get_user(username=token_data.username)
        return user
