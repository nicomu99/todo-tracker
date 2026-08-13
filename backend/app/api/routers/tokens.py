"""Token routes."""

from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.services import AuthenticationService
from app.api import get_auth_service
from app.models import Token


router = APIRouter()


@router.post("/token/")
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    auth_service: Annotated[AuthenticationService, Depends(get_auth_service)]
) -> Token:
    """Authenticate a user and return an access token.

    If the user is authenticated successfully, the access token is created and returned.

    Args:
        form_data:
        auth_service:

    Returns:

    """
    return auth_service.login(form_data.username, form_data.password)
