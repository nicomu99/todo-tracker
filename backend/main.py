"""Main entry point."""
from fastapi import FastAPI

from .routers import tasks, tokens, users
from .utils import TaskListNotFoundError, TaskNotFoundError, ForbiddenError
from .dependencies import task_list_not_found_error_handler, task_not_found_error_handler, forbidden_error_handler


app = FastAPI()
app.include_router(tasks.router)
app.include_router(users.router)
app.include_router(tokens.router)

app.add_exception_handler(
    TaskListNotFoundError, task_list_not_found_error_handler  # type: ignore
)

app.add_exception_handler(
    ForbiddenError, forbidden_error_handler  # type: ignore
)

app.add_exception_handler(
    TaskNotFoundError, task_not_found_error_handler  # type: ignore
)

# Very simple database: We have task lists, tasks and users
# A user can have multiple lists, each list can have multiple tasks

# TODO: Hide all endpoints behind authentication
# TODO: Create todo list per user
# TODO: Create little database


@app.get("/")
def read_root():
    """Check whether the API is reachable.

    Returns:
        A dictionary indicating that the connection is working.
    """
    return {"connection": True}
