import os
from pydantic import BaseModel
from dotenv import load_dotenv

# Load .env from project root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '..', '.env'))

class Settings(BaseModel):
    PROJECT_NAME: str = "BISathi API"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    BACKEND_HOST: str = os.getenv("BACKEND_HOST", "127.0.0.1")
    BACKEND_PORT: int = int(os.getenv("BACKEND_PORT", "8000"))
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")

settings = Settings()
