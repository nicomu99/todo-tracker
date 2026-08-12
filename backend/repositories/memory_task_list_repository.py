"""In memory task list repository."""
from datetime import datetime

from .task_list_repository import TaskListRepository

from ..models import TaskList, TaskListCreate, TaskListUpdate


class InMemoryTaskListRepository(TaskListRepository):

    def __init__(self):
        self.next_list_id = 1
        self.task_lists = {
            0: TaskList(**{
                "id": 0,
                "user_id": 0,
                "name": "General To-Do",
                "description": "This is my general to-do list.",
                "created_at": datetime.now(),
                "updated_at": datetime.now(),
            })
        }

    def get_task_lists(self) -> list[TaskList]:
        return list(self.task_lists.values())

    def get_task_list(self, list_id: int) -> TaskList | None:
        if list_id in self.task_lists:
            return self.task_lists[list_id]
        return None

    def get_task_lists_by_user_id(self, user_id: int) -> list[TaskList]:
        return [task_list for task_list in self.task_lists.values() if task_list.user_id == user_id]

    def create_task_list(self, task_list: TaskListCreate, user_id: int) -> TaskList:
        new_task_list = TaskList(
            id=self.next_list_id,
            user_id=user_id,
            name=task_list.name,
            description=task_list.description,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        self.next_list_id += 1
        return new_task_list

    def update_task_list(
        self,
        list_id: int,
        task_list_update: TaskListUpdate,
    ) -> TaskList | None:
        task_list = self.get_task_list(list_id)
        if task_list is None:
            return None

        for key, value in task_list_update.model_dump(exclude_unset=True).items():
            setattr(task_list, key, value)

        return task_list

    def delete_task_list(self, list_id: int) -> bool:
        return self.task_lists.pop(list_id, None) is not None
