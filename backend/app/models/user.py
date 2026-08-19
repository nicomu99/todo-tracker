"""User model."""
from datetime import datetime

from pydantic import BaseModel


class User(BaseModel):
    id: int
    username: str
    hashed_password: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None
    created_at: datetime


class UserCreate(BaseModel):
    username: str
    password: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserUpdate(BaseModel):
    username: str
    password: str | None = None
    email: str | None = None
    full_name: str | None = None


class UserResponse(BaseModel):
    id: int
    username: str
    full_name: str
