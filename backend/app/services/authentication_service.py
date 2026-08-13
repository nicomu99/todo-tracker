"""Authentication service."""
from datetime import datetime, timedelta, timezone

import jwt
from jwt.exceptions import InvalidTokenError


from app.models import Token, TokenData
from app.repositories import UserRepository
from app.exceptions import IncorrectCredentialsError
from app.security import PasswordHasher


class AuthenticationService:
    """Service for handling user authentication and access tokens."""

    def __init__(self, user_repository: UserRepository, password_hasher: PasswordHasher) -> None:
        """Initialize the authentication service.

        Args:
            user_repository: Repository used to retrieve user data.
        """
        self.user_repository = user_repository
        self.password_hasher = password_hasher

        self.secret_key = "781c0e1e43eec148e05253b6941f2a8fe46b2d5ba40a163e6a9f422851f7d059"
        self.algorithm = "HS256"
        self.ACCESS_TOKEN_EXPIRE_MINUTES = 60

    def authenticate_user(self, username: str, password: str):
        """Authenticate a user with the given username and password.

        Args:
            username: The user's username.
            password: The user's password.

        Returns:
            If the user is authenticated, return a User object.
        """
        user = self.user_repository.get_user_by_username(username)
        if not user:
            # Measure against timing attacks; attackers could else guess usernames
            self.password_hasher.dummy_hash(password)
            raise IncorrectCredentialsError("Incorrect username or password")
        if not self.password_hasher.verify_password(password, user.hashed_password):
            raise IncorrectCredentialsError("Incorrect username or password")
        return user

    def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
        """Create an access token.

        Args:
            data: A dictionary containing the data to be encoded.
            expires_delta: Time until the access token expires.

        Returns:
            An access token.
        """
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def get_user_from_token(self, token: str):
        """Retrieve the user associated with an access token.

        The token is decoded and its subject claim is used to look up the
        corresponding user.

        Args:
            token: JWT access token to be decoded.

        Returns:
            The user associated with the token, or None if the token is
            invalid or no corresponding user exists.
        """
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            user_id = payload.get("sub")
            if user_id is None:
                return None
            token_data = TokenData(user_id=user_id)
        except InvalidTokenError:
            return None

        if token_data.user_id is None:
            return None
        user = self.user_repository.get_user(user_id=token_data.user_id)
        return user

    def login(self, username: str, password: str) -> Token:
        """Handle a user login.

        Check whether the username and password combination matches. Return a token object
        if this is true.

        Args:
            username: A string containing the username.
            password: A string containing the password.

        Returns:
            A token object containing the user's access token.

        Raises:
            IncorrectCredentialsError: If the username or password is incorrect.
        """
        user = self.authenticate_user(username, password)
        access_token_expires = timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = self.create_access_token(
            data={"sub": user.id}, expires_delta=access_token_expires
        )
        return Token(access_token=access_token, token_type="bearer")
