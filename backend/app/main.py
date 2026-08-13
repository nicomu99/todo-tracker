"""Main entry point."""
from fastapi import FastAPI

from app.api.routers import tokens
from .api.routers import tasks, users
from .exceptions import (
    TaskListNotFoundError,
    TaskNotFoundError,
    UserNotFoundError,
    ForbiddenError,
    UserExistsError,
    UnexpectedError,
    IncorrectCredentialsError,
)
from .api import (
    task_list_not_found_error_handler,
    task_not_found_error_handler,
    user_not_found_error_handler,
    forbidden_error_handler,
    user_exists_error_handler,
    unexpected_error_handler,
    incorrect_credentials_error_handler,
)

# TODO: Create little database

app = FastAPI()
app.include_router(tasks.router)
app.include_router(users.router)
app.include_router(tokens.router)

app.add_exception_handler(
    TaskListNotFoundError, task_list_not_found_error_handler  # type: ignore
)

app.add_exception_handler(
    TaskNotFoundError, task_not_found_error_handler  # type: ignore
)

app.add_exception_handler(
    UserNotFoundError, user_not_found_error_handler  # type: ignore
)

app.add_exception_handler(
    ForbiddenError, forbidden_error_handler  # type: ignore
)

app.add_exception_handler(
    UserExistsError, user_exists_error_handler  # type: ignore
)

app.add_exception_handler(
    UnexpectedError, unexpected_error_handler  # type: ignore
)

app.add_exception_handler(
    IncorrectCredentialsError, incorrect_credentials_error_handler  # type: ignore
)


@app.get("/")
def read_root():
    """Check whether the API is reachable.

    Returns:
        A dictionary indicating that the connection is working.
    """
    return {"connection": True}
