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
    created_at: datetime


class TaskCreate(BaseModel):
    task_list_id: int
    name: str
    description: str | None
    priority: PositiveInt = 0
    effort: PositiveInt = 0
    due_date: datetime


class TaskUpdate(BaseModel):
    task_list_id: int
    name: str | None = None
    description: str | None = None
    priority: PositiveInt | None = None
    effort: PositiveInt | None = None
    due_date: datetime | None = None
