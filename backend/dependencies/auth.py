"""Authentication utility functions."""

from typing import Annotated

from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer


from ..models import User
from ..repositories import TaskRepository, InMemoryTaskRepository
from ..repositories import UserRepository, InMemoryUserRepository
from ..repositories import TaskListRepository, InMemoryTaskListRepository
from ..services import AuthenticationService, TaskService, UserService

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# TODO: Move these to its own file
task_repository: TaskRepository = InMemoryTaskRepository()
user_repository: UserRepository = InMemoryUserRepository()
task_list_repository: TaskListRepository = InMemoryTaskListRepository()

authentication_service_instance = AuthenticationService(user_repository)
task_service_instance = TaskService(task_repository, task_list_repository)
user_service_instance = UserService(user_repository)


def get_auth_service() -> AuthenticationService:
    """Get the authentication service.

    Returns:
        Authentication service instance.
    """
    return authentication_service_instance


def get_user_service() -> UserService:
    """Get the user service.

    Returns:
        User service instance.
    """
    return user_service_instance


def get_task_service() -> TaskService:
    """Get the task service.

    Returns:
        Task service instance.
    """
    return task_service_instance


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
    user = auth_service.get_user_from_token(token)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
    return user


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
