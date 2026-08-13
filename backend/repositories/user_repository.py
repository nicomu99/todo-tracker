"""Repository interface for Users."""

from __future__ import annotations
from abc import ABC, abstractmethod

from ..models import User, UserCreate, UserUpdate, UserResponse


class UserRepository(ABC):
    """Define the persistence operations available for user items.

    Concrete repository implementations are responsible for storing and
    retrieving users from a particular data source, such as an in-memory
    collection, SQLite database, or PostgreSQL database.
    """

    @abstractmethod
    def get_user(self, user_id: int) -> User | None:
        """Return the user with the given ID.

        Args:
            user_id: The unique user_id of the user.

        Returns:
            The matching user, or None if no user with the given user_id exists.
        """
        ...

    @abstractmethod
    def get_user_by_username(self, username: str) -> User | None:
        """Return the user with the given username.

        Args:
            username: The unique username of the user.

        Returns:
            The matching user, or None if no user with the given username exists.
        """
        ...

    @abstractmethod
    def create_user(self, user: UserCreate, hashed_password: str) -> UserResponse | None:
        """Store a new user.

        Args:
            user: The user to store.
            hashed_password: The hashed password of the user.

        Returns:
            The stored user, including any values generated during
            persistence.
        """
        ...

    @abstractmethod
    def update_user(self, user_id: int, user: UserUpdate) -> UserResponse | None:
        """Update an existing user.

        Only fields whose values are not None are updated. Fields set to None
        remain unchanged.

        Args:
            user_id: The ID of the user to update.
            user: Data used to update the user object.

        Returns:
            The updated user, or None if no user with the given username exists.
        """
        ...

    @abstractmethod
    def delete_user(self, user_id: int) -> bool:
        """Delete the user with the given ID.

        Args:
            user_id: The unique identifier of the user to delete.

        Returns:
            True if a user was deleted, otherwise False.
        """
        ...
