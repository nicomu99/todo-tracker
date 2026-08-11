"""Main entry point."""
from fastapi import FastAPI

from .routers import tasks, tokens, users


app = FastAPI()
app.include_router(tasks.router)
app.include_router(users.router)
app.include_router(tokens.router)

# Very simple database: We have task lists, tasks and users
# A user can have multiple lists, each list can have multiple tasks

# TODO: Hide all endpoints behind authentication
# TODO: Create todo list per user
# TODO: Create getter dependencies for services
# TODO: Create little database


@app.get("/")
def read_root():
    """Check whether the API is reachable.

    Returns:
        A dictionary indicating that the connection is working.
    """
    return {"connection": True}
