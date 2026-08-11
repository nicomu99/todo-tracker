from ..repositories import InMemoryUserRepository
from ..models import UserInDB


class UserService:
    def __init__(self):
        self.repository = InMemoryUserRepository()

    def get_user(self, username: str | None) -> UserInDB | None:
        if username is None:
            return None
        return self.repository.get_user(username)
