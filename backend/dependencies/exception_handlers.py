"""Exception handlers for all routes."""
from fastapi import Request, status
from fastapi.responses import JSONResponse

from ..utils import TaskListNotFoundError, TaskNotFoundError, ForbiddenError


def task_list_not_found_error_handler(_request: Request, exc: TaskListNotFoundError) -> JSONResponse:
    """Handle task list not found errors.

    Args:
        _request: The HTTP request that caused the exception.
        exc: The task list not found exception.

    Returns:
        A 404 Not Found JSON response containing the requested task list ID.
    """
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": f"Task list {exc.list_id} not found"}
    )


def task_not_found_error_handler(_request: Request, exc: TaskNotFoundError) -> JSONResponse:
    """Handle task not found errors.

    Args:
        _request: The HTTP request that caused the exception.
        exc: The task not found exception.

    Returns:
        A 404 Not Found JSON response containing the requested task ID.
    """
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": f"Task {exc.task_id} not found"}
    )


def forbidden_error_handler(_request: Request, _exc: ForbiddenError) -> JSONResponse:
    """Handle forbidden access errors.

    Args:
        _request: The HTTP request that caused the exception.
        _exc: The forbidden access exception.

    Returns:
        A 403 Forbidden JSON response indicating that the action is not authorized.
    """
    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN,
        content={"detail": "User is not authorized to perform this action"}
    )
