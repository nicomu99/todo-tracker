"""Repository interface for task lists."""

from __future__ import annotations
from abc import ABC, abstractmethod


class TaskListRepository(ABC):
    @abstractmethod
    def get_task_lists(self) -> list[TaskList]:
        ...

    @abstractmethod
    def get_task_list(self, list_id: int) -> TaskList:
        ...

    @abstractmethod
    def create_task_list(self, task_list: TaskListCreate) -> TaskList:
        ...

    @abstractmethod
    def update_task_list(
        self,
        list_id: int,
        *,
        name: str,
        description: str,
    ) -> TaskList:
        ...

    @abstractmethod
    def delete_task_list(self, list_id: int) -> bool:
        ...
