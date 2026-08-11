"""User routes."""

from typing import Annotated

from fastapi import APIRouter, Depends

from ..models import User
from ..dependencies import get_current_active_user

router = APIRouter()


@router.get("/users/")
def read_user(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user
