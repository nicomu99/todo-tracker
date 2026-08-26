"""Task model."""
from datetime import datetime

from pydantic import BaseModel, PositiveInt


class Task(BaseModel):
    id: int
    task_list_id: int
    name: str
    description: str | None
    priority: PositiveInt = 0
    effort: PositiveInt = 0
    completed: bool
    due_date: datetime


class TaskCreate(BaseModel):
    task_list_id: int
    name: str
    description: str | None
    priority: PositiveInt = 0
    effort: PositiveInt = 0


class TaskUpdate(BaseModel):
    task_list_id: int
    name: str | None = None
    description: str | None = None
    priority: PositiveInt = 0
    effort: PositiveInt = 0
