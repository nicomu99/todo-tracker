from .task_list_repository import TaskListRepository

from ..models import TaskList, TaskListCreate


class InMemoryTaskListRepository(TaskListRepository):
    def __init__(self):
        pass

    def get_task_lists(self) -> list[TaskList]:
        pass

    def get_task_list(self, list_id: int) -> TaskList:
        pass

    def create_task_list(self, task_list: TaskListCreate) -> TaskList:
        pass

    def update_task_list(
            self,
            list_id: int,
            *,
            name: str,
            description: str,
    ) -> TaskList:
        pass

    def delete_task_list(self, list_id: int) -> bool:
        pass
