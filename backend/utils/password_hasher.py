"""Password hasher."""
from pwdlib import PasswordHash


class PasswordHasher:
    """Class for hashing passwords."""

    def __init__(self):
        self.password_hash = PasswordHash.recommended()
        self.dummy_hash = self.password_hash.hash("dummypassword")

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify if the password matches the hashed password.

        Args:
            plain_password: The password to be verified.
            hashed_password: The hashed password.

        Returns:
            True if the passwords match, False otherwise.
        """
        return self.password_hash.verify(plain_password, hashed_password)

    def hash(self, password: str) -> str:
        """Hash the password.

        Args:
            password: Plain password to be hashed.

        Returns:
            Hash of the password.
        """
        return self.password_hash.hash(password)

    def perform_dummy_hash(self, password: str) -> None:
        """Performs a fake dummy hash.

        Args:
            password: The password to be hashed.
        """
        self.verify_password(password, self.dummy_hash)
