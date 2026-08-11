"""An in-memory user repository."""

from __future__ import annotations

from .user_repository import UserRepository
from ..models import UserCreate, User


class InMemoryUserRepository(UserRepository):
    def __init__(self) -> None:
        self.users: dict[str, User] = {
            "johndoe": User(**{
                "id": 0,
                "username": "johndoe",
                "full_name": "John Doe",
                "email": "johndoe@example.com",
                "hashed_password":
                    "$argon2id$v=19$m=65536,t=3,p=4$wagCPXjifgvUFBzq4hqe3w$CYaIb8sB+wtD+Vu/P4uod1+Qof8h+1g7bbDlBID48Rc",
                "disabled": False,
            })
        }

    def get_user(self, username: str) -> User | None:
        if username in self.users:
            return self.users[username]
        return None

    def create_user(self, user: UserCreate) -> User | None:
        # TODO hash password
        if user.username in self.users:
            return None
        self.users[user.username] = user
        return user

    def update_user(
        self,
        username: str,
        *,
        email: str | None = None,
        full_name: str | None = None,
        disabled: bool | None = None,
    ) -> User | None:
        user = self.users.get(username)
        if user is None:
            return None

        if email is not None:
            user.email = email
        if full_name is not None:
            user.full_name = full_name
        if disabled is not None:
            user.disabled = disabled

        return user

    def delete_user(self, username: str) -> bool:
        if username in self.users:
            del self.users[username]
            return True
        return False
