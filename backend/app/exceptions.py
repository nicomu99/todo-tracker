"""Exceptions."""


class TaskListNotFoundError(Exception):
    """Raised when a requested task list does not exist."""

    def __init__(self, list_id: int):
        self.list_id = list_id
        super().__init__(f"Task list with ID {list_id} not found.")


class TaskNotFoundError(Exception):
    """Raised when a requested task does not exist."""

    def __init__(self, task_id: int):
        self.task_id = task_id
        super().__init__(f"Task list with ID {task_id} not found.")


class UserNotFoundError(Exception):
    """Raised when a requested user does not exist."""


class UserExistsError(Exception):
    """Raised when a requested user already exists."""


class ForbiddenError(Exception):
    """Raised when a user is not authorized to access an object."""


class UnexpectedError(Exception):
    """Raised when an unexpected error occurs."""


class IncorrectCredentialsError(Exception):
    """Raised when a user enters incorrect credentials."""
