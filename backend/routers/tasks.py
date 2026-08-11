"""Tasks routes."""

from typing import Annotated

from fastapi import APIRouter, Response, HTTPException, status, Depends

from ..dependencies import get_task_service, get_current_active_user
from ..models import Task, TaskCreate, User
from ..services import TaskService
from ..utils import TaskListNotFoundError, TaskNotFoundError, InvalidUserError

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
    task_service: Annotated[TaskService, Depends(get_task_service)]
):
    """Return a task by ID.

    Args:
        task_id: The ID of the task to retrieve.
        task_service: Task service dependency that retrieves tasks.

    Returns:
        The task with the given ID.

    Raises:
        HTTPException: If no task with the given ID exists.
    """
    task = task_service.get_task_by_id(task_id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.get("/tasks/list/{list_id}")
def read_task_list(
    list_id: int,
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> list[Task]:
    """Return all tasks of a specific list.

    Args:
        list_id: The ID of the list to retrieve.
        task_service: Task service dependency that retrieves tasks.
        current_user: The user object to be read.

    Returns:
        A list containing all stored tasks.
    """
    try:
        tasks = task_service.get_tasks_by_list_id(list_id, current_user.id)
        return tasks
    except TaskListNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task list not found")
    except InvalidUserError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User not authorized to access this list")


@router.post("/tasks/")
def create_task(
    task: TaskCreate,
    task_service: Annotated[TaskService, Depends(get_task_service)]
):
    """Create a new task.

    Args:
        task: The data for the task to create.
        task_service: Task service dependency that creates tasks.

    Returns:
        The newly created task.
    """
    return task_service.create_task(task)


@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    task_service: Annotated[TaskService, Depends(get_task_service)],
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
        task_service: Task service dependency that updates tasks.
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
    try:
        task = task_service.update_task(
            task_id, name=name, description=description, priority=priority, effort=effort, completed=completed)
        return task
    except TaskNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")


@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    task_service: Annotated[TaskService, Depends(get_task_service)],
):
    """Delete a task by ID.

    Args:
        task_id: The ID of the task to delete.
        task_service: Task service dependency that deletes tasks.

    Returns:
        An empty HTTP response with status code 204.

    Raises:
        HTTPException: If no task with the given ID exists.
    """
    try:
        task_service.delete_task(task_id)
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except TaskNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
