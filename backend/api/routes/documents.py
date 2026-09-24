from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any

router = APIRouter()

DOCUMENTS_REGISTRY = [
    {
        "id": "is-456-2000",
        "tag": "STANDARDS",
        "standard_code": "IS 456:2000",
        "title": "IS 456:2000",
        "subtitle": "Plain and Reinforced Concrete — Code of Practice",
        "description": "Structural design and construction requirements for plain and reinforced concrete.",
        "status": "Verified",
        "page_count": 114,
        "default_clause": "Clause 7.2",
        "default_page": 18,
        "pdf_url": "/documents/IS_456_2000.pdf"
    },
    {
        "id": "is-302-1-2018",
        "tag": "PRODUCT SAFETY",
        "standard_code": "IS 302 (Part 1):2018",
        "title": "IS 302 (Part 1):2018",
        "subtitle": "Safety of Household and Similar Electrical Appliances",
        "description": "General safety requirements for household electrical appliances and testing.",
        "status": "Verified",
        "page_count": 86,
        "default_clause": "Clause 4.1",
        "default_page": 12,
        "pdf_url": "/documents/IS_302_1_2018.pdf"
    },
    {
        "id": "bis-act-2016",
        "tag": "ACT & STATUTE",
        "standard_code": "BIS Act, 2016",
        "title": "The Bureau of Indian Standards Act, 2016 (No. 11 of 2016)",
        "subtitle": "National Standards Body Statutory Mandate & Enforcement Provisions",
        "description": "Primary statute governing BIS functions (Sec 10), Standard Mark licensing (Sec 13), compulsory certification (Sec 16), and statutory penalties (Sec 29).",
        "status": "Statute",
        "page_count": 17,
        "default_clause": "Section 13",
        "default_page": 8,
        "pdf_url": "/documents/BIS_Act_2016.pdf"
    },
    {
        "id": "bis-rules-2018",
        "tag": "RULES",
        "standard_code": "BIS Rules, 2018",
        "title": "Bureau of Indian Standards Rules, 2018 (Amended 2020)",
        "subtitle": "Standard Formulation, Mark Restrictions & Appeals Mechanism",
        "description": "Statutory rules governing establishment of Indian standards, restrictions on name and mark (Rule 36), and appeal timelines (Rule 37: 90 days to DG, 60 days to Central Govt).",
        "status": "Rules",
        "page_count": 57,
        "default_clause": "Rule 37",
        "default_page": 49,
        "pdf_url": "/documents/BIS_Rules_2018.pdf"
    },
    {
        "id": "bis-ca-regulations-2018",
        "tag": "CONFORMITY ASSESSMENT",
        "standard_code": "BIS CA Reg. 2018",
        "title": "BIS (Conformity Assessment) Regulations, 2018",
        "subtitle": "Schemes I to X: Standard Mark (ISI) Licence & CoC",
        "description": "Master conformity assessment regulations governing Scheme-I (ISI Mark licence, factory audit, STI), Scheme-IV (Certificate of Conformity), renewal, and foreign manufacturers (FMCS).",
        "status": "Gazette",
        "page_count": 412,
        "default_clause": "Scheme-I (Para 1)",
        "default_page": 243,
        "pdf_url": "/documents/BIS_Conformity_Assessment_Regulations_2018.pdf"
    },
    {
        "id": "bis-hallmarking-regulations-2018",
        "tag": "HALLMARKING",
        "standard_code": "BIS Hallmarking Reg. 2018",
        "title": "BIS (Hallmarking) Regulations, 2018 (Incorporating Amdts)",
        "subtitle": "Jeweller Registration, AHC Recognition & Purity Mandate",
        "description": "Official regulations governing jeweller registration (Reg 3), jeweller purity liability (Reg 5), Assaying & Hallmarking Centres (Reg 9 per IS 15820), and 6-digit HUID.",
        "status": "Gazette",
        "page_count": 92,
        "default_clause": "Regulation 5",
        "default_page": 53,
        "pdf_url": "/documents/BIS_Hallmarking_Regulations_2018.pdf"
    },
    {
        "id": "bis-hallmarking-amendment-2022",
        "tag": "HALLMARKING",
        "standard_code": "BIS HM Amdt. 2022",
        "title": "BIS (Hallmarking) Amendment Regulations, 2022",
        "subtitle": "Schedule IV Statutory Hallmarking Fee Rates",
        "description": "Official Gazette notification establishing mandatory hallmarking fee: ₹45 per gold article (min ₹200/consignment) and ₹35 per silver article (min ₹150/consignment).",
        "status": "Gazette",
        "page_count": 3,
        "default_clause": "Schedule IV",
        "default_page": 3,
        "pdf_url": "/documents/BIS_Hallmarking_Amendment_2022.pdf"
    },
    {
        "id": "bis-marking-fee-notification-2021",
        "tag": "FEES & CONCESSIONS",
        "standard_code": "BIS MF Notif. 2021",
        "title": "BIS Marking Fee & Concession Notification (2021)",
        "subtitle": "Marking Rates & 20%-50% Concessions for Micro, Women & Startups",
        "description": "Official Gazette notification prescribing unit marking fees, 20% concession for Micro scale enterprises, and 50% concession for Startups and Women entrepreneurs.",
        "status": "Gazette",
        "page_count": 4,
        "default_clause": "Concessions",
        "default_page": 3,
        "pdf_url": "/documents/BIS_Marking_Fee_Notification_2021.pdf"
    },
    {
        "id": "bis-simplified-procedure",
        "tag": "CERTIFICATION",
        "standard_code": "BIS Simplified Procedure",
        "title": "List of Products Under Simplified Procedure",
        "subtitle": "Fast-Track Product Certification (Scheme-I)",
        "description": "Authorized BIS notification detailing products eligible for fast-track 30-day licensing with pre-testing at BIS approved laboratories.",
        "status": "Official",
        "page_count": 27,
        "default_clause": "Rule 1",
        "default_page": 1,
        "pdf_url": "/documents/List_of_Products_Under_Simplified_Procedure.pdf"
    },
    {
        "id": "bis-lab-recognition-scheme",
        "tag": "LABORATORIES",
        "standard_code": "BIS LRS:2020",
        "title": "BIS Laboratory Recognition Scheme, 2020",
        "subtitle": "Guidelines for Recognition & Empanelment of Testing Labs",
        "description": "Rules governing recognition, testing audits, and empanelment of testing laboratories under ISO/IEC 17025 accreditation.",
        "status": "Verified",
        "page_count": 28,
        "default_clause": "Rule 1.1",
        "default_page": 1,
        "pdf_url": "/documents/BIS_Lab_Recognition_Scheme_2020.pdf"
    },
    {
        "id": "bis-advisory-committees-regulations",
        "tag": "GOVERNANCE",
        "standard_code": "BIS AC Reg. 2020",
        "title": "BIS (Advisory Committees) Regulations, 2018 (Amended 2020)",
        "subtitle": "Conformity Assessment Advisory Committee Governance",
        "description": "Regulations specifying composition, membership, and mandate of advisory committees advising BIS on conformity assessment policy.",
        "status": "Gazette",
        "page_count": 18,
        "default_clause": "Regulation 5",
        "default_page": 3,
        "pdf_url": "/documents/BIS_Advisory_Committees_Regulations_2020.pdf"
    }
]

@router.get("/documents")
def list_documents():
    return DOCUMENTS_REGISTRY

@router.get("/documents/{document_id}")
def get_document(document_id: str):
    doc = next((d for d in DOCUMENTS_REGISTRY if d["id"] == document_id), None)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc
