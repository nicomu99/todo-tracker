"""Tasks routes."""

from fastapi import APIRouter, Response, HTTPException, status

from ..repositories import InMemoryTaskRepository
from ..models import Task, TaskBase

router = APIRouter()

task_repository = InMemoryTaskRepository()


@router.get("/tasks/")
def read_tasks() -> list[Task]:
    """Return all tasks.

    Returns:
        A list containing all stored tasks.
    """
    return task_repository.get_tasks()


@router.get("/tasks/{task_id}")
def read_task(task_id: int):
    """Return a task by ID.

    Args:
        task_id: The ID of the task to retrieve.

    Returns:
        The task with the given ID.

    Raises:
        HTTPException: If no task with the given ID exists.
    """
    task = task_repository.get_task(task_id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.post("/tasks/")
def create_task(task: TaskBase):
    """Create a new task.

    Args:
        task: The data for the task to create.

    Returns:
        The newly created task.
    """
    return task_repository.create_task(task)


@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    *,
    name: str | None = None,
    description: str | None = None,
    priority: int | None = None,
    effort: float | None = None,
    completed: bool | None = None,
):
    """Update an existing task.

    Only values that are provided are passed to the repository for updating.

    Args:
        task_id: The ID of the task to update.
        name: The new task name.
        description: The new task description.
        priority: The new task priority.
        effort: The new estimated effort.
        completed: The new completion status.

    Returns:
        The updated task.

    Raises:
        HTTPException: If no task with the given ID exists.
    """
    task = task_repository.update_task(
        task_id,
        name=name,
        description=description,
        priority=priority,
        effort=effort,
        completed=completed
    )

    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    """Delete a task by ID.

    Args:
        task_id: The ID of the task to delete.

    Returns:
        An empty HTTP response with status code 204.

    Raises:
        HTTPException: If no task with the given ID exists.
    """
    task_deleted = task_repository.delete_task(task_id)
    if not task_deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
