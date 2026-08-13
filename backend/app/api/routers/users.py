"""User routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, Response, status

from app.models import UserUpdate
from app.api import get_current_active_user, get_user_service
from app.models import User, UserCreate, UserResponse
from app.services import UserService

router = APIRouter()


@router.get("/users/")
def read_user(
    current_user: Annotated[User, Depends(get_current_active_user)],
    user_service: Annotated[UserService, Depends(get_user_service)],
) -> UserResponse:
    """Read a user.

    The function checks whether a user exists in the database and evaluates
    whether their token is valid.

    Args:
        current_user: Currently authenticated user.
        user_service: User service dependency handling the retrieval of a new user.

    Returns:
        A user object if it exists, None otherwise.
    """
    return user_service.get_user(current_user.id)


@router.post("/users/")
def create_user(
    user: UserCreate,
    user_service: Annotated[UserService, Depends(get_user_service)]
) -> UserResponse:
    """Create a new user.

    Args:
        user: Data used to create a new user.
        user_service: User service dependency handling the creation of a new user.

    Returns:
        The newly created user.
    """
    return user_service.create_user(user)


@router.patch("/users/")
def update_user(
    user_update: UserUpdate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    user_service: Annotated[UserService, Depends(get_user_service)],
) -> UserResponse:
    """Update a user.

    Args:
        user_update: User object to be updated.
        current_user: Currently authenticated user.
        user_service: User service dependency handling the update of a user.

    Returns:
        The updated user.
    """
    return user_service.update_user(current_user.id, user_update, current_user.id)


@router.delete("/users/")
def delete_user(
    current_user: Annotated[User, Depends(get_current_active_user)],
    user_service: Annotated[UserService, Depends(get_user_service)],
) -> Response:
    """Delete a user.

    Args:
        current_user: Currently authenticated user.
        user_service: User service dependency handling the deletion of a user.

    Returns:
        An empty HTTP response with status code 204.
    """
    user_service.delete_user(current_user.id, current_user.id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
