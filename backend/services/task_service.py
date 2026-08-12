"""Task service."""
from ..models import Task, TaskCreate, TaskUpdate
from ..models import TaskList, TaskListCreate, TaskListUpdate
from ..repositories import TaskRepository, TaskListRepository
from ..utils import TaskListNotFoundError, TaskNotFoundError, ForbiddenError


class TaskService:
    """Service for handling task and task list request."""

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
            user_id: Unique identifier of the user requesting access.

        Returns:
            The matching task or None if no task with the given id exists.

        Raises:
            ForbiddenError: If the user is not authorized to access this task.
            TaskListNotFoundError: If the task list with the given ID does not exist.
        """
        task = self._get_task(task_id)

        self._get_owned_task_list(task.task_list_id, user_id)
        return task

    def get_tasks_by_list_id(self, list_id: int, user_id: int) -> list[Task]:
        """Retrieves all tasks from a particular task list.

        Args:
            list_id: Unique identifier of the task list.
            user_id: Unique identifier of the user requesting access.

        Returns:
            All tasks associated with the given task list. Returns an empty
            list if the task list contains no tasks.

        Raises:
            ForbiddenError: If the user is not authorized to access the task list.
            TaskListNotFoundError: If the task list with the given ID does not exist.
        """
        self._get_owned_task_list(list_id, user_id)

        tasks = self.task_repository.get_tasks_by_list_id(list_id)
        return tasks

    def create_task(self, task: TaskCreate, user_id: int) -> Task:
        """Create a new task.

        Args:
            task: Task object to be created.
            user_id: Unique identifier of the user requesting access.

        Returns:
            The newly created task.

        Raises:
            ForbiddenError: If the user is not authorized to access the task list.
            TaskListNotFoundError: If the task list with the given ID does not exist.
        """
        self._get_owned_task_list(task.task_list_id, user_id)

        task = self.task_repository.create_task(task)
        return task

    def update_task(
        self,
        task_id: int,
        task_update: TaskUpdate,
        user_id: int,
    ) -> Task:
        """Update an existing task.

        Only values that are provided are passed to the repository for updating.

        Args:
            task_id: The ID of the task to update.
            task_update: Task data used to update the task.
            user_id: Unique identifier of the user requesting access.

        Returns:
            The updated task.

        Raises:
            TaskNotFoundError: If no task with the given ID exists.
            ForbiddenError: If the user is not authorized to access the task list.
            TaskListNotFoundError: If the task list with the given ID does not exist.
        """
        self._get_owned_task_list(task_update.task_list_id, user_id)

        task = self.task_repository.update_task(
            task_id,
            task_update
        )
        if task is None:
            # Defensive check
            raise TaskNotFoundError(task_id)
        return task

    def delete_task(self, task_id: int, user_id: int) -> None:
        """Delete a task by its id.

        Args:
            task_id: The ID of the task to delete.
            user_id: Unique identifier of the user requesting access.

        Raises:
            ForbiddenError: If the user is not authorized to access the task list.
            TaskListNotFoundError: If the task list of the deleted task does not exist.
            TaskNotFoundError: If the task with the given ID does not exist.
        """
        task = self._get_task(task_id)
        self._get_owned_task_list(task.task_list_id, user_id)

        deleted = self.task_repository.delete_task(task_id)
        if not deleted:
            raise TaskNotFoundError(task_id)

    def get_task_lists(self) -> list[TaskList]:
        """Retrieves all task lists.

        Returns:
            A list of all task lists.
        """
        return self.task_list_repository.get_task_lists()

    def get_task_lists_by_user_id(self, user_id: int) -> list[TaskList]:
        """Retrieve all task lists of a user.

        Args:
            user_id: Unique identifier of the user requesting access.

        Returns:
            A list with all task lists.
        """
        return self.task_list_repository.get_task_lists_by_user_id(user_id)

    def get_task_list(self, list_id: int, user_id: int) -> TaskList:
        """Retrieves a task list by its id.

        Args:
            list_id: Unique identifier of the task list.
            user_id: Unique identifier of the user requesting access.

        Returns:
            A task list.

        Raises:
            ForbiddenError: If the user is not authorized to access the task list.
            TaskListNotFoundError: If the task list with the given ID does not exist.
        """
        return self._get_owned_task_list(list_id, user_id)

    def create_task_list(self, task_list: TaskListCreate, user_id: int) -> TaskList:
        """Create a new task list.

        Args:
            task_list: Task list data used to create the new task list.
            user_id: Unique identifier of the user requesting access.

        Returns:
            The newly created task list.
        """
        task_list = self.task_list_repository.create_task_list(task_list, user_id)
        return task_list

    def update_task_list(
        self,
        list_id: int,
        task_list_update: TaskListUpdate,
        user_id: int,
    ) -> TaskList:
        """Update an existing task list.

        Args:
            list_id: Unique identifier of the list to update.
            task_list_update: Task list data used to update the task list.
            user_id: Unique identifier of the user requesting access.

        Returns:
            The updated task list.

        Raises:
            ForbiddenError: If the user is not authorized to access the task list.
            TaskListNotFoundError: If the task list with the given ID does not exist.
        """
        self._get_owned_task_list(list_id, user_id)
        new_task_list = self.task_list_repository.update_task_list(list_id, task_list_update)
        return new_task_list

    def delete_task_list(self, list_id: int, user_id: int) -> None:
        """Deletes a task list by its id.

        Args:
            list_id: Unique identifier of the task list to delete.
            user_id: Unique identifier of the user requesting access.

        Raises:
            TaskListNotFoundError: If the task list with the given ID does not exist.
            ForbiddenError: If the user is not authorized to access the task list.
        """
        self._get_owned_task_list(list_id, user_id)
        deleted = self.task_list_repository.delete_task_list(list_id)
        if not deleted:
            raise TaskListNotFoundError(list_id)

    def _get_task(self, task_id: int) -> Task:
        task = self.task_repository.get_task(task_id)
        if task is None:
            raise TaskNotFoundError(task_id)
        return task

    def _get_owned_task_list(self, list_id: int, user_id: int) -> TaskList:
        task_list = self.task_list_repository.get_task_list(list_id)
        if task_list is None:
            raise TaskListNotFoundError(list_id)
        if task_list.user_id != user_id:
            raise ForbiddenError("User is not authorized to access this task list.")
        return task_list
