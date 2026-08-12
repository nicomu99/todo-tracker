"""Task list routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, Response, status

from ..dependencies import get_task_service, get_current_active_user
from ..models import Task, User
from ..models import TaskList, TaskListCreate, TaskListUpdate
from ..services import TaskService

router = APIRouter()

# TODO: Implement Repository functions


@router.get("/task-lists/dump")
def dump_task_lists(task_service: Annotated[TaskService, Depends(get_task_service)]) -> list[TaskList]:
    """Return all task lists.

    Args:
        task_service: Task service dependency that retrieves task lists.

    Returns:
        A list containing all stored task lists.
    """
    return task_service.get_task_lists()


@router.get("/task-lists/")
def read_task_lists(
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)]
) -> list[TaskList]:
    """Return all task lists.

    Args:
        task_service: Task service dependency that retrieves task lists.
        current_user: The currently authenticated user.

    Returns:
        A list containing all stored task lists.
    """
    return task_service.get_task_lists_by_user_id(current_user.id)


@router.get("/task-lists/{list_id}")
def read_task_list(
    list_id: int,
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)]
) -> TaskList:
    """Return a task list by ID.

    Args:
        list_id: Unique identifier of the task list.
        task_service: Task service dependency that retrieves tasks lists.
        current_user: The currently authenticated user.

    Returns:
        The corresponding task list.

    Raises:
        HTTPException: If no task list with the given ID exists.
        HTTPException: If the user is not authorized to access the task list.
    """
    return task_service.get_task_list(list_id, current_user.id)


@router.get("/task-lists/{list_id}/tasks")
def read_tasks_by_list_id(
    list_id: int,
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)]
) -> list[Task]:
    """Return all tasks of a specific list.

    Args:
        list_id: The ID of the list to retrieve.
        task_service: Task service dependency that retrieves tasks.
        current_user: Currently authenticated user.

    Returns:
        A list containing all stored tasks.

    Raises:
        HTTPException: If no task list with the given ID exists.
        HTTPException: If the user is not authorized to access the task list.
    """
    return task_service.get_tasks_by_list_id(list_id, current_user.id)


@router.post("/task-lists/")
def create_task_list(
    task_list: TaskListCreate,
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> TaskList:
    """Create a new task list.

    Args:
        task_list: Task list data used to create a new task list.
        task_service: Task service dependency that retrieves tasks.
        current_user: Currently authenticated user.

    Returns:
        The newly created task list.
    """
    return task_service.create_task_list(task_list, current_user.id)


@router.patch("/task-lists/{list_id}")
def update_task_list(
    list_id: int,
    task_list: TaskListUpdate,
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> TaskList:
    """Update a task list.

    Args:
        list_id: Unique identifier of the task list to update.
        task_list: Task list data used to update the task list.
        task_service: Task service dependency that updates the task list.
        current_user: Currently authenticated user.

    Returns:
        The updated task list.
    """
    return task_service.update_task_list(list_id, task_list, current_user.id)


@router.delete("/task-lists/{list_id}")
def delete_task_list(
    list_id,
    task_service: Annotated[TaskService, Depends(get_task_service)],
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> Response:
    """Deletes a task list by its ID.

    Args:
        list_id: Unique identifier of the task list to delete.
        task_service: Task service dependency that deletes the task list.
        current_user: Currently authenticated user.

    Returns:
        An empty HTTP response with status code 204.

    Raises:
        HTTPException: If no task list with the given ID exists.
        HTTPException: If the user is not authorized to access the task list.
    """
    task_service.delete_task_list(list_id, current_user.id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
