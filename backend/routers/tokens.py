"""Token routes."""

from typing import Annotated

from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from ..services import AuthenticationService
from ..dependencies import get_auth_service
from ..models import Token


router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 60


@router.post("/token/")
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    auth_service: Annotated[AuthenticationService, Depends(get_auth_service)]
):
    """Authenticate a user and return an access token.

    If the user is authenticated successfully, the access token is created and returned.

    Args:
        form_data:
        auth_service:

    Returns:

    """
    user = auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_service.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
