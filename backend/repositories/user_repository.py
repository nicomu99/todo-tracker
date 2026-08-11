"""Repository interface for Users."""

from __future__ import annotations
from abc import ABC, abstractmethod


class UserRepository(ABC):
    """Define the persistence operations available for user items.

    Concrete repository implementations are responsible for storing and
    retrieving users from a particular data source, such as an in-memory
    collection, SQLite database, or PostgreSQL database.
    """

    @abstractmethod
    def get_user(self, username: str) -> User | None:
        """Return the user with the given username.

        Args:
            username: The unique identifier of the user.

        Returns:
            The matching user, or None if no user with the given username exists.
        """
        ...

    @abstractmethod
    def create_user(self, user: User) -> User:
        """Store a new user.

        Args:
            user: The user to store.

        Returns:
            The stored user, including any values generated during
            persistence.
        """
        ...

    @abstractmethod
    def update_user(
        self,
        username: str,
        *,
        email: str | None = None,
        full_name: str | None = None,
        disabled: bool | None = None,
    ) -> User | None:
        """Update an existing user.

        Only fields whose values are not None are updated. Fields set to None
        remain unchanged.

        Args:
            username: The username of the user to update.
            email: The user's new email address.
            full_name: The user's new full name.
            disabled: The user's new disabled status.

        Returns:
            The updated user, or None if no user with the given username exists.
        """
        ...

    @abstractmethod
    def delete_user(self, username: str) -> bool:
        """Delete the user with the given ID.

        Args:
            username: The unique identifier of the username to delete.

        Returns:
            True if a user was deleted, otherwise False.
        """
        ...
