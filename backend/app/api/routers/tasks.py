"""Tasks routes."""

from typing import Annotated

from fastapi import APIRouter, Response, status, Depends

from app.api import get_task_service, get_current_active_user
from app.models import Task, TaskCreate, TaskUpdate, User
from app.services import TaskService

router = APIRouter()


@router.get("/tasks/")
def read_tasks(task_service: Annotated[TaskService, Depends(get_task_service)]) -> list[Task]:
    """Return all tasks.

    Args:
        task_service: Task service dependency that retrieves tasks.

    Returns:
        A list containing all stored tasks.
    """
    return task_service.get_tasks()


@router.get("/tasks/{task_id}")
def read_task(
    task_id: int,
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)]
) -> Task:
    """Return a task by ID.

    Args:
        task_id: The ID of the task to retrieve.
        task_service: Task service dependency that retrieves tasks.
        current_user: Currently authenticated user.

    Returns:
        The task with the given ID.

    Raises:
        HTTPException: If no task with the given ID exists.
        HTTPException: If the user is not authorized to access the task list.
        HTTPException: If the task list associated with the task does not exist.
    """
    task = task_service.get_task_by_id(task_id, current_user.id)
    return task


@router.post("/tasks/")
def create_task(
    task: TaskCreate,
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    """Create a new task.

    Args:
        task: The data for the task to create.
        task_service: Task service dependency that creates tasks.
        current_user: Currently authenticated user.

    Returns:
        The newly created task.

    Raises:
        HTTPException: If no task with the given ID exists.
        HTTPException: If the user is not authorized to access the task list.
        HTTPException: If no task list with the given ID exists.
    """
    return task_service.create_task(task, current_user.id)


@router.patch("/tasks/{task_id}")
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    """Update an existing task.

    Only values that are provided are passed to the repository for updating.

    Args:
        task_id: The ID of the task to update.
        task_update: The data for the task to update.
        task_service: Task service dependency that updates tasks.
        current_user: Currently authenticated user.

    Returns:
        The updated task.

    Raises:
        HTTPException: If no task with the given ID exists.
        HTTPException: If the user is not authorized to access the task list.
        HTTPException: If the task's list does not exist.
    """
    task = task_service.update_task(
        task_id,
        task_update,
        current_user.id,
    )
    return task


@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    """Delete a task by ID.

    Args:
        task_id: The ID of the task to delete.
        task_service: Task service dependency that deletes tasks.
        current_user: Currently authenticated user.

    Returns:
        An empty HTTP response with status code 204.

    Raises:
        HTTPException: If no task with the given ID exists.
        HTTPException: If the user is not authorized to access the task list.
        HTTPException: If the task's list does not exist.
    """
    task_service.delete_task(task_id, current_user.id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
