"""An in-memory task repository."""
from datetime import datetime, timedelta

from .task_repository import TaskRepository
from app.models import Task, TaskCreate, TaskUpdate


class InMemoryTaskRepository(TaskRepository):
    def __init__(self):
        self.next_task_id = 10
        self.tasks: dict[int, Task] = {
            0: Task(**{
                "id": 0,
                "task_list_id": 0,
                "name": "Groceries",
                "description": "Buy tomatoes, peaches, milk, and bread",
                "priority": 2,
                "effort": 2,
                "completed": True,
                "due_date": datetime.now() - timedelta(days=2),
                "created_at": datetime.now() - timedelta(days=3),
            }),

            1: Task(**{
                "id": 1,
                "task_list_id": 0,
                "name": "Clean apartment",
                "description": "Vacuum floors and clean the kitchen",
                "priority": 1,
                "effort": 2,
                "completed": False,
                "due_date": datetime.now() + timedelta(days=5) + timedelta(hours=13) + timedelta(minutes=15),
                "created_at": datetime.now() - timedelta(days=6),
            }),

            2: Task(**{
                "id": 2,
                "task_list_id": 0,
                "name": "Pay electricity bill",
                "description": "Pay the monthly electricity bill",
                "priority": 3,
                "effort": 1,
                "completed": False,
                "due_date": datetime.now() + timedelta(days=8) + timedelta(hours=11) - timedelta(minutes=15),
                "created_at": datetime.now() - timedelta(days=1),
            }),

            3: Task(**{
                "id": 3,
                "task_list_id": 0,
                "name": "Call dentist",
                "description": "Schedule the next dental check-up",
                "priority": 2,
                "effort": 1,
                "completed": False,
                "due_date": datetime.now() + timedelta(days=11) + timedelta(hours=4) - timedelta(minutes=20),
                "created_at": datetime.now() - timedelta(days=12),
            }),

            4: Task(**{
                "id": 4,
                "task_list_id": 0,
                "name": "Return library books",
                "description": "Return borrowed books before they are overdue",
                "priority": 2,
                "effort": 1,
                "completed": False,
                "due_date": datetime.now() + timedelta(days=14) + timedelta(hours=9) - timedelta(minutes=10),
                "created_at": datetime.now() - timedelta(days=8),
            }),

            5: Task(**{
                "id": 5,
                "task_list_id": 1,
                "name": "Finalize research question",
                "description": "Refine and clearly formulate the main research question",
                "priority": 3,
                "effort": 3,
                "completed": False,
                "due_date": datetime.now() + timedelta(days=16) + timedelta(hours=2) - timedelta(minutes=6),
                "created_at": datetime.now() - timedelta(days=9),
            }),

            6: Task(**{
                "id": 6,
                "task_list_id": 1,
                "name": "Review literature",
                "description": "Read and summarize the most relevant academic papers",
                "priority": 3,
                "effort": 3,
                "completed": False,
                "due_date": datetime.now() + timedelta(days=19) - timedelta(hours=16) + timedelta(minutes=35),
                "created_at": datetime.now() - timedelta(days=5),
            }),

            7: Task(**{
                "id": 7,
                "task_list_id": 1,
                "name": "Prepare dataset",
                "description": "Clean and organize the data needed for the analysis",
                "priority": 2,
                "effort": 3,
                "completed": False,
                "due_date": datetime.now() + timedelta(days=22) - timedelta(hours=3),
                "created_at": datetime.now() - timedelta(days=4),
            }),

            8: Task(**{
                "id": 8,
                "task_list_id": 1,
                "name": "Implement experiment",
                "description": "Create the Python code required to run the thesis experiment",
                "priority": 3,
                "effort": 3,
                "completed": False,
                "due_date": datetime.now() + timedelta(days=25) + timedelta(hours=7),
                "created_at": datetime.now() - timedelta(days=2),
            }),

            9: Task(**{
                "id": 9,
                "task_list_id": 1,
                "name": "Write methodology chapter",
                "description": "Document the research design, data, and experimental procedure",
                "priority": 2,
                "effort": 3,
                "completed": False,
                "due_date": datetime.now() + timedelta(days=28) - timedelta(hours=7),
                "created_at": datetime.now() - timedelta(days=7),
            }),
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
            due_date=task.due_date,
            created_at=datetime.now(),
        )
        self.tasks[self.next_task_id] = new_task
        self.next_task_id += 1
        return new_task

    def update_task(
            self,
            task_id: int,
            task_update: TaskUpdate,
    ) -> Task | None:
        task = self.tasks.get(task_id)
        if task is None:
            return None

        for key, value in task_update.model_dump(exclude_unset=True).items():
            setattr(task, key, value)

        return task

    def delete_task(self, task_id: int) -> bool:
        if task_id in self.tasks:
            del self.tasks[task_id]
            return True
        return False

    def delete_tasks_by_list_id(self, list_id: int) -> None:
        self.tasks = {
            key: value for key, value in self.tasks.items() if value.task_list_id != list_id
        }
