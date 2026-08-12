"""User service."""

from ..models import User
from ..repositories import UserRepository


class UserService:
    """Service for handling CRUD operations related to users."""

    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def get_user(self, username: str | None) -> User | None:
        """Retrieve a user by username.

        Args:
            username: The username of the user to retrieve.

        Returns:
            A user object if it exists, otherwise None.
        """
        if username is None:
            return None
        return self.user_repository.get_user(username)
