"""Authentication utility functions."""
from typing import Annotated

import jwt
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer

from app.models import User
from app.services import AuthenticationService

from .dependencies import get_auth_service

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login/")


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    auth_service: Annotated[AuthenticationService, Depends(get_auth_service)]
) -> User | None:
    """Get the current user.

    Decodes the JWT token and returns the user object if it exists.

    Args:
        token: JWT token to be decoded.
        auth_service: Authentication service instance.

    Returns:
        The user object if it exists.
    """
    try:
        user = auth_service.get_user_from_token(token)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"}
            )
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token is expired",
            headers={"WWW-Authenticate": "Bearer"}
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )


def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
) -> User:
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
