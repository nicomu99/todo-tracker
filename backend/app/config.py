"""Configuration file for loading environment variables"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")
    secret_key: str
    allowed_origins: str | None = None


settings = Settings()
