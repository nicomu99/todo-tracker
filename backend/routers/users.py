"""User routes."""

from typing import Annotated

from fastapi import APIRouter, Depends

from ..models import User
from ..dependencies import get_current_active_user

router = APIRouter()


@router.get("/users/")
def read_user(current_user: Annotated[User, Depends(get_current_active_user)]):
    """Read a user.

    The function checks whether a user exists in the database and evaluates
    whether their token is valid.

    Args:
        current_user: The user object to be read.

    Returns:
        A user object if it exists, None otherwise.
    """
    return current_user
