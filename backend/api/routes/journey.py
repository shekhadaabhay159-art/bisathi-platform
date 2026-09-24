from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

@router.post("/journey/start")
def start_journey(product: str = "concrete"):
    return {
        "journey_id": "journey_001",
        "product": product,
        "current_step": 2,
        "status": "in_progress",
        "recommended_standard": "IS 456:2000" if "concrete" in product.lower() else "IS 302 (Part 1):2018",
        "next_step": "Review Clause 7.2 Testing & Sampling Specifications"
    }

@router.get("/journey/{journey_id}")
def get_journey_status(journey_id: str):
    return {
        "journey_id": journey_id,
        "product": "Structural Concrete",
        "current_step": 3,
        "status": "ready_for_lab",
        "lab": "National Materials Testing Centre (Ahmedabad)"
    }
