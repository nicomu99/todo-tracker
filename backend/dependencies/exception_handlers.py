"""Exception handlers for all routes."""
from fastapi import Request, status
from fastapi.responses import JSONResponse

from ..utils import (
    TaskListNotFoundError,
    TaskNotFoundError,
    ForbiddenError,
    UserNotFoundError,
    UserExistsError,
    UnexpectedError,
    IncorrectCredentialsError,
)


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


def user_not_found_error_handler(_request: Request, _exc: UserNotFoundError) -> JSONResponse:
    """Handle user not found errors.

    Args:
        _request: The HTTP request that caused the exception.
        _exc: The user not found exception.

    Returns:
        A 404 Not Found JSON response.
    """
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": "User not found"}
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


def user_exists_error_handler(_request: Request, _exc: UserExistsError) -> JSONResponse:
    """Handle user exists errors.

    Args:
        _request: The HTTP request that caused the exception.
        _exc: Exception raised when a user already exists.

    Returns:
        A 409 Conflict JSON response indicating that the username exists already.
    """
    return JSONResponse(
        status_code=status.HTTP_409_CONFLICT,
        content={"detail": f"Username already exists"}
    )


def unexpected_error_handler(_request: Request, _exc: UnexpectedError) -> JSONResponse:
    """Handle unexpected access errors.

    Args:
        _request: The HTTP request that caused the exception.
        _exc: Exception raised when an unexpected error occurs.

    Returns:
        A 500 Internal Server Error JSON response indicating an unexpected error.
    """
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Unexpected error"}
    )


def incorrect_credentials_error_handler(_request: Request, _exc: IncorrectCredentialsError) -> JSONResponse:
    """Handle incorrect credentials errors.

    Args:
        _request: The HTTP request that caused the exception.
        _exc: Exception raised when a user enters incorrect credentials.

    Returns:

    """
    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content={
            "detail": "Incorrect username or password",
            "headers": {"WWW-Authenticate": "Bearer"}
        }
    )
