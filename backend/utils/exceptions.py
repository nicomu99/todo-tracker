"""Exceptions."""


class TaskListNotFoundError(Exception):
    """Raised when a requested task list does not exist."""
    pass


class TaskNotFoundError(Exception):
    """Raised when a requested task does not exist."""


class ForbiddenError(Exception):
    """Raised when a user is not authorized to access an object."""
