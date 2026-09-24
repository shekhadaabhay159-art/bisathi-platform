from fastapi import APIRouter
from typing import List
from backend.models.schemas import PathwayStep

router = APIRouter()

CERTIFICATION_PATHWAYS_DATA = [
    {
        "step_number": "01",
        "title": "Identify the applicable standard",
        "description": "Describe your product and find the relevant Indian Standard.",
        "badge": "START HERE",
        "badge_type": "amber",
        "details": "Search authorized BIS database for your product category. Verify if standard falls under Mandatory Certification (Scheme-I / Scheme-IV) or voluntary ISI mark.",
        "related_standard": "IS 456:2000",
        "clause_ref": "Clause 1 (Scope)"
    },
    {
        "step_number": "02",
        "title": "Understand conformity requirements",
        "description": "Review testing, marking and documentation requirements.",
        "badge": "GUIDANCE",
        "badge_type": "gray",
        "details": "Each standard outlines strict physical, chemical, and safety testing guidelines alongside Scheme of Testing and Inspection (STI).",
        "related_standard": "IS 302 (Part 1):2018",
        "clause_ref": "Clause 4 & 7"
    },
    {
        "step_number": "03",
        "title": "Choose the right assessment route",
        "description": "Check the applicable BIS certification or hallmarking pathway.",
        "badge": "GUIDANCE",
        "badge_type": "gray",
        "details": "Choose between Normal Procedure (testing takes 1-2 months followed by factory inspection) or Simplified Procedure (pre-testing in BIS-approved lab).",
        "related_standard": "Scheme-I / CRS",
        "clause_ref": "Conformity Assessment Reg. 2018"
    },
    {
        "step_number": "04",
        "title": "Prepare your next step",
        "description": "Use official procedures and verified laboratory information.",
        "badge": "GUIDANCE",
        "badge_type": "gray",
        "details": "Prepare technical dossiers, factory quality control setup, and schedule test batches with a BIS recognized laboratory.",
        "related_standard": "BIS Portal / Manakonline",
        "clause_ref": "Operational Manual Clause 5"
    }
]

@router.get("/certification", response_model=List[PathwayStep])
@router.post("/certification/search", response_model=List[PathwayStep])
def get_certification_pathways():
    return CERTIFICATION_PATHWAYS_DATA
