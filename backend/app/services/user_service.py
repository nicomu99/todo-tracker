"""User service."""
from app.models import UserResponse, UserCreate, UserUpdate
from app.repositories import UserRepository
from app.exceptions import UserNotFoundError, UserExistsError, UnexpectedError
from app.security import PasswordHasher


class UserService:
    """Service for handling CRUD operations related to users."""

    def __init__(self, user_repository: UserRepository, password_hasher: PasswordHasher):
        self.user_repository = user_repository
        self.password_hasher = password_hasher

    def get_user(self, user_id: int) -> UserResponse:
        """Retrieve a user by user_id.

        Args:
            user_id: Unique ID of the user to retrieve.

        Returns:
            A user object if it exists, otherwise None.

        Raises:
            UserNotFoundError: If the requested user does not exist.
        """
        user = self.user_repository.get_user(user_id)
        if user is None:
            raise UserNotFoundError("The requested user does not exist.")
        return UserResponse(**user.model_dump())

    def create_user(self, user: UserCreate) -> UserResponse:
        """Create a new user object.

        Args:
            user: Data used to create a new user.

        Returns:
            A response object containing the newly created user object.
        """
        if self.user_repository.get_user_by_username(user.username) is not None:
            raise UserExistsError("The requested user already exists.")
        hashed_password = self.password_hasher.hash(user.password)
        new_user = self.user_repository.create_user(user, hashed_password)
        if new_user is None:
            raise UnexpectedError("The requested user already exists.")
        return new_user

    def update_user(
        self,
        user_id: int,
        user: UserUpdate,
        active_user_id: int
    ) -> UserResponse:
        """Update a user object.

        Args:
            user_id: Unique identifier of the user to update.
            user: Data used to update the user object.
            active_user_id: Unique identifier of the currently active user.

        Returns:
            A response object containing the updated user object.

        Raises:
            ForbiddenError: If the user is not authorized to perform this action.
        """
        self._check_user_id(user_id, active_user_id)
        hashed_password = self.password_hasher.hash(user.password) if user.password else None
        user_response = self.user_repository.update_user(user_id, user, hashed_password)
        if user_response is None:
            raise UserNotFoundError("The requested user does not exist.")
        return user_response

    def delete_user(self, user_id: int, active_user_id: int) -> None:
        """Delete a user object.

        Args:
            user_id: Unique identifier of the user to delete.
            active_user_id: Unique identifier of the currently active user.

        Raises:
            ForbiddenError: If the user is not authorized to perform this action.
        """
        self._check_user_id(user_id, active_user_id)
        deleted = self.user_repository.delete_user(user_id)
        if not deleted:
            raise UserNotFoundError("The requested user does not exist.")

    @staticmethod
    def _check_user_id(user_id: int, active_user_id: int) -> None:
        if user_id != active_user_id:
            raise UserNotFoundError("The requested user does not exist.")
