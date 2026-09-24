from fastapi import APIRouter
from typing import List
from backend.models.schemas import StandardItem

router = APIRouter()

MOCK_STANDARDS_DB = [
    {
        "id": "is-456-2000",
        "number": "01",
        "tag": "Standards · 2000",
        "standard_code": "IS 456:2000",
        "title": "Plain and Reinforced Concrete — Code of Practice",
        "description": "Structural design and construction requirements for plain and reinforced concrete.",
        "category": "Civil & Construction",
        "year": 2000,
        "page_count": 114,
        "default_clause": "Clause 7.2",
        "default_page": 18,
        "pdf_url": "/documents/IS_456_2000.pdf"
    },
    {
        "id": "is-302-1-2018",
        "number": "02",
        "tag": "Product safety · 2018",
        "standard_code": "IS 302 (Part 1):2018",
        "title": "Safety of Household and Similar Electrical Appliances",
        "description": "General safety requirements for household electrical appliances and testing.",
        "category": "Electrotechnical",
        "year": 2018,
        "page_count": 86,
        "default_clause": "Clause 4.1",
        "default_page": 12,
        "pdf_url": "/documents/IS_302_1_2018.pdf"
    }
]

@router.get("/standards", response_model=List[StandardItem])
@router.post("/standards/search", response_model=List[StandardItem])
def get_standards():
    return MOCK_STANDARDS_DB
