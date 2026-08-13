"""Dependency getters that can be used for endpoints."""
from app.repositories import TaskRepository, InMemoryTaskRepository
from app.repositories import UserRepository, InMemoryUserRepository
from app.repositories import TaskListRepository, InMemoryTaskListRepository
from app.services import AuthenticationService, TaskService, UserService
from app.security import PasswordHasher

password_hasher = PasswordHasher()

task_repository: TaskRepository = InMemoryTaskRepository()
user_repository: UserRepository = InMemoryUserRepository()
task_list_repository: TaskListRepository = InMemoryTaskListRepository()

authentication_service_instance = AuthenticationService(user_repository, password_hasher)
task_service_instance = TaskService(task_repository, task_list_repository)
user_service_instance = UserService(user_repository, password_hasher)


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
