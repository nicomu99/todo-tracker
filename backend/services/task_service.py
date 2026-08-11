"""Task service."""
from ..models import Task, TaskCreate
from ..repositories import TaskRepository, TaskListRepository
from ..utils import TaskListNotFoundError, TaskNotFoundError, InvalidUserError


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

    def get_task_by_id(self, task_id: int) -> Task | None:
        """Retrieve a task by its id.

        Args:
            task_id: The unique identifier of the task.

        Returns:
            The matching task or None if no task with the given id exists.
        """
        return self.task_repository.get_task(task_id)

    def get_tasks_by_list_id(self, list_id: int, user_id: int) -> list[Task]:
        """Retrieves all tasks from a particular task list.

        Args:
            list_id: Unique identifier of the task list.
            user_id: Unique identifier of the user who owns the task list.

        Returns:
            All tasks associated with the given task list. Returns an empty
            list if the task list contains not tasks.

        Raises:
            InvalidUserError: If the user is not authorized to access this task.
            TaskListNotFoundError: If the task list with the given id does not exist.
        """
        task_list = self.task_list_repository.get_list_by_id(list_id)
        if task_list is None:
            raise TaskListNotFoundError("Task list not found.")
        if task_list.user_id != user_id:
            raise InvalidUserError("User is not authorized to access this task.")
        tasks = self.task_repository.get_tasks_by_list_id(list_id)
        return tasks

    def create_task(self, task: TaskCreate) -> Task:
        """Create a new task.

        Args:
            task: Task object to be created.

        Returns:
            The newly created task.
        """
        return self.task_repository.create_task(task)

    def update_task(
        self,
        task_id: int,
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
        task = self.task_repository.update_task(
            task_id,
            name=name,
            description=description,
            priority=priority,
            effort=effort,
            completed=completed
        )
        if task is None:
            raise TaskNotFoundError("Task not found.")
        return task

    def delete_task(self, task_id: int) -> bool:
        deleted = self.task_repository.delete_task(task_id)
        if not deleted:
            raise TaskNotFoundError("Task not found.")
        return deleted
