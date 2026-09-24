from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "BISathi API",
        "evidence_engine": "online",
        "version": "2.0.0"
    }
