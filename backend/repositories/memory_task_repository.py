"""An in-memory task repository."""

from datetime import datetime

from .task_repository import TaskRepository
from ..models import Task, TaskCreate


class InMemoryTaskRepository(TaskRepository):
    def __init__(self):
        self.next_task_id = 1
        self.tasks: dict[int, Task] = {
            0: Task(**{
                "id": 0,
                "task_list_id": 0,
                "name": "Groceries",
                "description": "Tomatoes, Peaches",
                "priority": 2,
                "effort": 2,
                "completed": False,
                "created_at": datetime.now()
            })
        }

    def get_tasks(self) -> list[Task]:
        return list(self.tasks.copy().values())

    def get_task(self, task_id: int) -> Task | None:
        if task_id in self.tasks:
            return self.tasks[task_id]
        return None

    def get_tasks_by_list_id(self, list_id: int) -> list[Task]:
        tasks = [task for task in self.tasks.values() if task.task_list_id == list_id]
        return tasks

    def create_task(self, task: TaskCreate) -> Task:
        new_task_id = self.next_task_id
        new_task = Task(
            id=new_task_id,
            task_list_id=task.task_list_id,
            name=task.name,
            description=task.description,
            priority=task.priority,
            effort=task.effort,
            completed=False,
            created_at=datetime.now()
        )
        self.tasks[self.next_task_id] = new_task
        self.next_task_id += 1
        return new_task

    def update_task(
            self,
            task_id: int,
            *,
            name: str | None = None,
            description: str | None = None,
            priority: int | None = None,
            effort: float | None = None,
            completed: bool | None = None,
    ) -> Task | None:
        task = self.tasks.get(task_id)
        if task is None:
            return None

        if name is not None:
            task.name = name
        if description is not None:
            task.description = description
        if priority is not None:
            task.priority = priority
        if effort is not None:
            task.effort = effort
        if completed is not None:
            task.completed = completed

        return task

    def delete_task(self, task_id: int) -> bool:
        if task_id in self.tasks:
            del self.tasks[task_id]
            return True
        return False
