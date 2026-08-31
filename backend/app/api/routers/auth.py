"""Token routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, Cookie, Response
from fastapi.security import OAuth2PasswordRequestForm

from app.services import AuthenticationService
from app.api import get_auth_service
from app.models import AccessToken


router = APIRouter()


@router.post("/auth/login/")
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    auth_service: Annotated[AuthenticationService, Depends(get_auth_service)],
    response: Response
) -> AccessToken:
    """Authenticate a user and return a new token pair.

    If the user is authenticated successfully, the tokens are created and returned.

    Args:
        form_data: Authentication form data that must contain the username and password.
        auth_service: Authentication dependency that handles the authentication.
        response: Response object that contains the response to return to the client.

    Returns:
        A new token pair consisting of an access token and refresh token.
    """
    auth_token, refresh_token = auth_service.login(form_data.username, form_data.password)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax"
    )

    return auth_token


@router.post("/auth/refresh/")
def refresh_access_token(
    refresh_token: Annotated[str, Cookie()],
    auth_service: Annotated[AuthenticationService, Depends(get_auth_service)],
) -> AccessToken:
    return auth_service.refresh_access_token(refresh_token)

@router.post("/auth/logout/")
def logout(response: Response):
    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        secure=False,
        samesite="lax"
    )
