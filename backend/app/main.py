"""Main entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routers import tasks, users, auth, task_lists
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

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(task_lists.router)

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
