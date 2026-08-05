"""Task item."""

from datetime import datetime

from pydantic import BaseModel

class TaskCreate(BaseModel):
    name: str
    description: str
    priority: int
    effort: float


class Task(BaseModel):
    task_id: int
    name: str
    description: str
    priority: int
    effort: float
    completed: bool
    created_at: datetime