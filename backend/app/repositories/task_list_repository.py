"""Repository interface for task lists."""

from __future__ import annotations
from abc import ABC, abstractmethod

from app.models import TaskList, TaskListCreate, TaskListUpdate


class TaskListRepository(ABC):
    """Repository interface for task lists."""

    @abstractmethod
    def get_task_lists(self) -> list[TaskList]:
        """Return a list of all task lists.

        Returns:
            List of all task lists.
        """
        ...

    @abstractmethod
    def get_task_list(self, list_id: int) -> TaskList | None:
        """Return a task list by its id.

        Args:
            list_id: Unique identifier of the task list to retrieve.

        Returns:
            The matching task list if it exists, otherwise None.
        """
        ...

    @abstractmethod
    def get_task_lists_by_user_id(self, user_id: int) -> list[TaskList]:
        """Retrieve all task lists belonging to the given user id.

        Args:
            user_id: Unique identifier of the user whose task lists to retrieve.

        Returns:
            A list of task lists belonging to the given user id if task lists belong
            to the given user id, otherwise None.
        """
        ...

    @abstractmethod
    def create_task_list(self, task_list: TaskListCreate, user_id: int) -> TaskList:
        """Create a new task list.

        Args:
            task_list: Data used to create a new task list.
            user_id: The user id of the user the task list belongs to.

        Returns:
            The newly created task list.
        """
        ...

    @abstractmethod
    def update_task_list(self, list_id: int, task_list_update: TaskListUpdate,) -> TaskList | None:
        """Update a task list.

        Args:
            list_id: The id of the task list to update.
            task_list_update: Data used to update the task list.

        Returns:
            The updated task list.
        """
        ...

    @abstractmethod
    def delete_task_list(self, list_id: int) -> bool:
        """Delete a task list.

        Args:
            list_id: Unique identifier of the task list to delete.

        Returns:
            True if the task list was successfully deleted, False otherwise.
        """
        ...
