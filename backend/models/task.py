"""Task model."""

from datetime import datetime

from pydantic import BaseModel, PositiveInt


class Task(BaseModel):
    id: int
    task_list_id: int
    name: str
    description: str | None
    priority: PositiveInt = 0
    effort: float = 0
    completed: bool
    created_at: datetime


class TaskCreate(BaseModel):
    task_list_id: int
    name: str
    description: str | None
    priority: PositiveInt = 0
    effort: float = 0
