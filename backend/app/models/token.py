"""Token model."""
from pydantic import BaseModel


class AccessToken(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: int | None = None
