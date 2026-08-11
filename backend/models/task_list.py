"""Task list model."""
from datetime import datetime

from pydantic import BaseModel


class TaskList(BaseModel):
    id: int
    user_id: int
    name: str
    description: str
    created_at: datetime
    updated_at: datetime


class TaskListCreate(BaseModel):
    name: str
    description: str
