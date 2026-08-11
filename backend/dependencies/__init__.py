"""Dependency module."""

from .auth import get_current_active_user
from .auth import get_task_service, get_auth_service

__all__ = [
    "get_current_active_user",
    "get_task_service",
    "get_auth_service"
]
