"""Task model."""

from datetime import datetime

from pydantic import BaseModel


class TaskBase(BaseModel):
    name: str
    description: str
    priority: int
    effort: float


class Task(TaskBase):
    task_id: int
    completed: bool
    created_at: datetime
