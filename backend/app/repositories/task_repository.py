"""Repository interface for Tasks."""

from __future__ import annotations
from abc import ABC, abstractmethod

from app.models import Task, TaskCreate, TaskUpdate


class TaskRepository(ABC):
    """Define the persistence operations available for task items.

    Concrete repository implementations are responsible for storing and
    retrieving tasks from a particular data source, such as an in-memory
    collection, SQLite database, or PostgreSQL database.
    """

    @abstractmethod
    def get_tasks(self) -> list[Task]:
        """Return all stored tasks.

        Returns:
            A list containing all tasks. Returns an empty list when no
            tasks are stored.
        """
        ...

    @abstractmethod
    def get_task(self, task_id: int) -> Task | None:
        """Return the task with the given ID.

        Args:
            task_id: The unique identifier of the task.

        Returns:
            The matching task, or None if no task with the given ID exists.
        """
        ...

    @abstractmethod
    def get_tasks_by_list_id(self, list_id: int) -> list[Task]:
        """Retrieve all tasks from a particular task list.

        Args:
            list_id: Unique identifier of the task list.

        Returns:
            The matching tasks, or None if no task with the given ID exists.
        """
        ...

    @abstractmethod
    def create_task(self, task: TaskCreate) -> Task:
        """Store a new task.

        Args:
            task: The task to store.

        Returns:
            The stored task, including any values generated during
            persistence, such as its ID.
        """
        ...

    @abstractmethod
    def update_task(
        self,
        task_id: int,
        task_update: TaskUpdate,
    ) -> Task | None:
        """Update an existing task.

        Only fields whose values are not None are updated. Fields set to None
        remain unchanged.

        Args:
            task_id: The ID of the task to update.
            task_update: Data used to update the task.

        Returns:
            The updated task, or None if no task with the given ID exists.
        """
        ...

    @abstractmethod
    def delete_task(self, task_id: int) -> bool:
        """Delete the task with the given ID.

        Args:
            task_id: The unique identifier of the task to delete.

        Returns:
            True if a task was deleted, otherwise False.
        """
        ...
