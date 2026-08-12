"""Task service."""
from ..models import Task, TaskCreate
from ..repositories import TaskRepository, TaskListRepository
from ..utils import TaskListNotFoundError, TaskNotFoundError, ForbiddenError


class TaskService:
    def __init__(
        self,
        task_repository: TaskRepository,
        task_list_repository: TaskListRepository
    ):
        self.task_repository = task_repository
        self.task_list_repository = task_list_repository

    def get_tasks(self) -> list[Task]:
        """Retrieve all tasks.

        Returns:
            A list containing all tasks in the database.
        """
        return self.task_repository.get_tasks()

    def get_task_by_id(self, task_id: int, user_id: int) -> Task:
        """Retrieve a task by its id.

        Args:
            task_id: The unique identifier of the task.
            user_id: The unique identifier of the user who owns the task.

        Returns:
            The matching task or None if no task with the given id exists.

        Raises:
            ForbiddenError: If the user is not authorized to access this task.
            TaskListNotFoundError: If the task list with the given ID does not exist.
        """
        task = self._ensure_task_existence(task_id)

        self._ensure_list_ownership(task.task_list_id, user_id)
        return task

    def get_tasks_by_list_id(self, list_id: int, user_id: int) -> list[Task]:
        """Retrieves all tasks from a particular task list.

        Args:
            list_id: Unique identifier of the task list.
            user_id: Unique identifier of the user who owns the task list.

        Returns:
            All tasks associated with the given task list. Returns an empty
            list if the task list contains no tasks.

        Raises:
            ForbiddenError: If the user is not authorized to access the task list.
            TaskListNotFoundError: If the task list with the given ID does not exist.
        """
        self._ensure_list_ownership(list_id, user_id)

        tasks = self.task_repository.get_tasks_by_list_id(list_id)
        return tasks

    def create_task(self, task: TaskCreate, user_id: int) -> Task:
        """Create a new task.

        Args:
            task: Task object to be created.
            user_id: Unique identifier of the authenticated user.

        Returns:
            The newly created task.

        Raises:
            ForbiddenError: If the user is not authorized to access the task list.
            TaskListNotFoundError: If the task list with the given ID does not exist.
        """
        self._ensure_list_ownership(task.task_list_id, user_id)

        task = self.task_repository.create_task(task)
        return task

    def update_task(
        self,
        task_id: int,
        user_id: int,
        *,
        name: str | None = None,
        description: str | None = None,
        priority: int | None = None,
        effort: float | None = None,
        completed: bool | None = None,
    ) -> Task:
        """Update an existing task.

        Only values that are provided are passed to the repository for updating.

        Args:
            task_id: The ID of the task to update.
            user_id: Unique identifier of the authenticated user.
            name: The new task name.
            description: The new task description.
            priority: The new task priority.
            effort: The new estimated effort.
            completed: The new completion status.

        Returns:
            The updated task.

        Raises:
            TaskNotFoundError: If no task with the given ID exists.
            ForbiddenError: If the user is not authorized to access the task list.
            TaskListNotFoundError: If the task list with the given ID does not exist.
        """
        existing_task = self._ensure_task_existence(task_id)
        self._ensure_list_ownership(existing_task.task_list_id, user_id)

        task = self.task_repository.update_task(
            task_id,
            name=name,
            description=description,
            priority=priority,
            effort=effort,
            completed=completed
        )
        if task is None:
            # Defensive check
            raise TaskNotFoundError(task_id)
        return task

    def delete_task(self, task_id: int, user_id: int) -> None:
        """Delete a task by its id.

        Args:
            task_id: The ID of the task to delete.
            user_id: The unique identifier of the user who owns the task.

        Raises:
            ForbiddenError: If the user is not authorized to access the task list.
            TaskListNotFoundError: If the task list of the deleted task does not exist.
            TaskNotFoundError: If the task with the given ID does not exist.
        """
        task = self._ensure_task_existence(task_id)
        self._ensure_list_ownership(task.task_list_id, user_id)

        deleted = self.task_repository.delete_task(task_id)
        if not deleted:
            raise TaskNotFoundError(task_id)

    def _ensure_task_existence(self, task_id: int) -> Task:
        task = self.task_repository.get_task(task_id)
        if task is None:
            raise TaskNotFoundError(task_id)
        return task

    def _ensure_list_ownership(self, list_id: int, user_id: int) -> None:
        task_list = self.task_list_repository.get_task_list(list_id)
        if task_list is None:
            raise TaskListNotFoundError(list_id)
        if task_list.user_id != user_id:
            raise ForbiddenError("User is not authorized to access this task list.")
