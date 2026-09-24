from fastapi import APIRouter
from typing import List
from backend.models.schemas import LabItem

router = APIRouter()

LABS_REGISTRY = [
    {
        "id": "lab-ahmedabad",
        "name": "National Materials Testing Centre",
        "city": "Ahmedabad",
        "state": "Gujarat",
        "categories": ["Construction materials", "Concrete", "Aggregates"],
        "status": "BIS directory reference",
        "verified": True,
        "action_text": "Filter by Ahmedabad >",
        "address": "Plot 42, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat 382445",
        "accreditation": "NABL & BIS Recognized (IS 456, IS 383, IS 516)"
    },
    {
        "id": "lab-mumbai",
        "name": "Electrical Safety Test Laboratory",
        "city": "Mumbai",
        "state": "Maharashtra",
        "categories": ["Household appliances", "Electrical safety"],
        "status": "BIS directory reference",
        "verified": True,
        "action_text": "Filter by Mumbai >",
        "address": "Central Testing Wing, Andheri East, Mumbai, Maharashtra 400093",
        "accreditation": "BIS Recognized Central Facility (IS 302 series, IS 616)"
    },
    {
        "id": "lab-delhi",
        "name": "Product Conformity Assessment Lab",
        "city": "New Delhi",
        "state": "Delhi",
        "categories": ["Consumer products", "Mechanical testing"],
        "status": "BIS directory reference",
        "verified": True,
        "action_text": "Filter by New Delhi >",
        "address": "BIS Central Laboratory, Sahibabad / Okhla Industrial Area, New Delhi 110020",
        "accreditation": "National Apex BIS Testing Facility (Multiple IS Standards)"
    }
]

@router.get("/laboratories", response_model=List[LabItem])
@router.post("/laboratories/search", response_model=List[LabItem])
def search_laboratories():
    return LABS_REGISTRY
