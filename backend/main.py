import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.core.config import settings
from backend.api.routes import health, chat, documents, standards, laboratories, certification, journey

app = FastAPI(
    title="BISathi API",
    description="Evidence-first AI document platform for Indian Standards (BIS)",
    version="2.0.0"
)

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API v1 routers
app.include_router(health.router, prefix=settings.API_V1_STR, tags=["Health"])
app.include_router(chat.router, prefix=settings.API_V1_STR, tags=["Chat"])
app.include_router(documents.router, prefix=settings.API_V1_STR, tags=["Documents"])
app.include_router(standards.router, prefix=settings.API_V1_STR, tags=["Standards"])
app.include_router(laboratories.router, prefix=settings.API_V1_STR, tags=["Laboratories"])
app.include_router(certification.router, prefix=settings.API_V1_STR, tags=["Certification"])
app.include_router(journey.router, prefix=settings.API_V1_STR, tags=["Journey"])

@app.get("/")
def root():
    return {
        "message": "Welcome to BISathi API — Ask. Verify. Act.",
        "docs": "/docs",
        "api_v1": settings.API_V1_STR
    }

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
