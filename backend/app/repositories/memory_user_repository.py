"""An in-memory user repository."""
from __future__ import annotations
from datetime import datetime

from .user_repository import UserRepository
from app.models import User, UserCreate, UserUpdate, UserResponse


class InMemoryUserRepository(UserRepository):
    def __init__(self) -> None:
        self.next_user_id: int = 0
        self.users: dict[int, User] = {
            0: User(**{
                "id": 0,
                "username": "johndoe",
                "full_name": "John Doe",
                "email": "johndoe@example.com",
                "hashed_password":
                    "$argon2id$v=19$m=65536,t=3,p=4$wagCPXjifgvUFBzq4hqe3w$CYaIb8sB+wtD+Vu/P4uod1+Qof8h+1g7bbDlBID48Rc",
                "disabled": False,
                "created_at": datetime.now(),
            })
        }

    def get_user(self, user_id: int) -> User | None:
        if user_id not in self.users:
            return None
        return self.users[user_id]

    def get_user_by_username(self, username: str) -> User | None:
        for user in self.users.values():
            if user.username == username:
                return user
        return None

    def create_user(self, user: UserCreate, hashed_password: str) -> UserResponse | None:
        for existing_user in self.users.values():
            if existing_user.username == user.username:
                return None
        new_user = User(
            id=self.next_user_id,
            username=user.username,
            hashed_password=hashed_password,
            full_name=user.full_name,
            email=user.email,
            created_at=datetime.now(),
        )
        self.users[self.next_user_id] = new_user
        self.next_user_id += 1
        return UserResponse(**user.model_dump())

    def update_user(self, user_id: int, user_update: UserUpdate, hashed_password: str | None = None) -> UserResponse | None:
        user = self.users.get(user_id)
        if user is None:
            return None

        for key, value in user_update.model_dump(exclude_unset=True).items():
            if key != "password":
                setattr(user, key, value)

        if hashed_password is not None:
            user.hashed_password = hashed_password

        return UserResponse(**user.model_dump())

    def delete_user(self, user_id: int) -> bool:
        return self.users.pop(user_id, None) is not None
