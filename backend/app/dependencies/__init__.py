"""Dependency module."""

from .auth import get_current_active_user
from .auth import get_task_service, get_auth_service, get_user_service
from .exception_handlers import task_list_not_found_error_handler
from .exception_handlers import task_not_found_error_handler
from .exception_handlers import user_not_found_error_handler
from .exception_handlers import forbidden_error_handler
from .exception_handlers import user_exists_error_handler
from .exception_handlers import unexpected_error_handler
from .exception_handlers import incorrect_credentials_error_handler

__all__ = [
    "get_current_active_user",
    "get_task_service",
    "get_auth_service",
    "get_user_service",
    "task_list_not_found_error_handler",
    "task_not_found_error_handler",
    "user_not_found_error_handler",
    "forbidden_error_handler",
    "user_exists_error_handler",
    "unexpected_error_handler",
    "incorrect_credentials_error_handler"
]
