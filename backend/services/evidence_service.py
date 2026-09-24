"""
BISathi Gemini AI Service
Powered by Google Gemini with BIS knowledge grounding.
"""
import re
import json
from typing import Optional
from backend.models.schemas import ChatResponse, CitationSource, LibraryDoc
from backend.core.config import settings

# ── BIS Grounding Knowledge Base ────────────────────────────────────────────
# This is used as system context for Gemini so it answers authoritatively
# about BIS standards and Indian regulatory framework.
KNOWLEDGE_BASE = {
    "is-456-2000": {
        "standard_code": "IS 456:2000",
        "title": "Plain and Reinforced Concrete — Code of Practice (Fourth Revision)",
        "pdf_url": "/documents/IS_456_2000.pdf",
        "clauses": {
            "7.2": {
                "clause_name": "Clause 7.2",
                "clause_title": "Sampling and Strength Test of Concrete",
                "page": 18,
                "summary": "Mandates random sampling of fresh concrete in accordance with IS 1199. Three 150mm cubes constitute a sample tested at 28 days as per IS 516. Individual variation must not exceed ±15% of average.",
                "key_points": [
                    "Fresh concrete sampled as per IS 1199 from random batches.",
                    "Three test specimens represent one sample; average strength determines compliance.",
                    "Individual cube variation within a sample must not exceed ±15% of mean strength.",
                    "Frequency of sampling follows Table 11 based on concrete quantity."
                ],
                "next_step": "Calculate your daily batch volume using Table 11 to determine mandatory cube sampling frequency before structural casting."
            },
            "7.3": {
                "clause_name": "Clause 7.3 & Table 11",
                "clause_title": "Sampling Frequency & Acceptance Criteria",
                "page": 19,
                "summary": "Table 11 sets sampling frequency and acceptance criteria for concrete cubes.",
                "key_points": [
                    "Table 11: 1 sample (1-5 m³), 2 samples (6-15 m³), 3 samples (16-30 m³), 4 samples (31-50 m³), +1 per 50 m³.",
                    "Three 150mm cubes = one sample; compliance based on 28-day compressive strength.",
                    "Individual variation must not exceed ±15% of the sample mean.",
                    "Non-compliance triggers core tests or non-destructive evaluation per Clause 7.4."
                ],
                "next_step": "Verify testing schedule against Table 11 and maintain 28-day cube strength logs for BIS conformity."
            }
        }
    },
    "is-302-1-2018": {
        "standard_code": "IS 302 (Part 1):2018",
        "title": "Safety of Household and Similar Electrical Appliances",
        "pdf_url": "/documents/IS_302_1_2018.pdf",
        "clauses": {
            "4.1": {
                "clause_name": "Clause 4.1",
                "clause_title": "General Safety Requirement",
                "page": 12,
                "summary": "Appliances must be constructed to function safely without hazard to persons or surroundings, even during careless operation.",
                "key_points": [
                    "Design must withstand mechanical and electrical stresses in normal use.",
                    "Components (cords, switches, plugs) must independently comply with relevant Indian Standards.",
                    "Electric strength and leakage limits tested at operating temperature (Clause 13)."
                ],
                "next_step": "Submit prototype samples for type testing to a BIS-recognized electrical safety laboratory."
            }
        }
    },
    "bis-act-2016": {
        "standard_code": "BIS Act, 2016 (No. 11 of 2016)",
        "title": "The Bureau of Indian Standards Act, 2016",
        "pdf_url": "/documents/BIS_Act_2016.pdf",
        "clauses": {
            "sec-16": {
                "clause_name": "Section 16",
                "clause_title": "Quality Control Orders (QCOs) — Compulsory Certification",
                "page": 9,
                "summary": "Empowers the Central Government to direct mandatory BIS certification for specified goods.",
                "key_points": [
                    "QCOs issued under Section 16 make BIS certification mandatory.",
                    "Covers health, safety, environment, national security.",
                    "Prohibits manufacture, import, distribution, sale of non-certified QCO goods.",
                    "Applies to domestic manufacturers and foreign exporters."
                ],
                "next_step": "Check if your product's IS is notified under a QCO requiring mandatory certification."
            },
            "sec-29": {
                "clause_name": "Section 29",
                "clause_title": "Penalties for Contravention",
                "page": 13,
                "summary": "Prescribes statutory punishments for unauthorized use of the Standard Mark.",
                "key_points": [
                    "Unauthorized use of BIS name/logo/Standard Mark: fine up to ₹5 lakh (Sec 29(1)).",
                    "Manufacturing/selling prohibited articles without compulsory mark: imprisonment up to 2 years.",
                    "Mandatory minimum fine of ₹2 lakh for first contravention.",
                    "Repeat contraventions: fines up to 10× total value of goods produced or sold."
                ],
                "next_step": "Ensure a valid licence is granted before applying the ISI mark on production packaging."
            }
        }
    },
    "bis-hallmarking-regulations-2018": {
        "standard_code": "BIS (Hallmarking) Regulations, 2018",
        "title": "BIS Hallmarking Regulations for Gold & Silver Jewellery",
        "pdf_url": "/documents/BIS_Hallmarking_Regulations_2018.pdf",
        "clauses": {
            "reg-3": {
                "clause_name": "Regulation 3",
                "clause_title": "Mandatory Hallmarking Requirements",
                "page": 4,
                "summary": "All gold jewellery sold in India must carry three mandatory marks: BIS logo, purity/fineness, and 6-digit HUID.",
                "key_points": [
                    "BIS triangular emblem required on every hallmarked article.",
                    "Purity in Karat and fineness: 22K916, 18K750, 14K585.",
                    "6-digit HUID (Hallmark Unique Identification) stamped by authorized AHC.",
                    "Hallmarking mandatory in all districts of India since July 2021."
                ],
                "next_step": "Verify HUID using the BIS Care mobile app. Register as a jeweller at bisindia.gov.in."
            }
        }
    },
    "bis-ca-regulations-2018": {
        "standard_code": "BIS (Conformity Assessment) Regulations, 2018",
        "title": "BIS Conformity Assessment Regulations",
        "pdf_url": "/documents/Conformity_Assessment_2018.pdf",
        "clauses": {
            "scheme-i": {
                "clause_name": "Scheme-I",
                "clause_title": "Product Certification — Normal Scheme",
                "page": 4,
                "summary": "Standard 4-step BIS product certification: application, testing, factory audit, licence grant.",
                "key_points": [
                    "Step 1: File application on Manakonline portal with product details.",
                    "Step 2: Get samples tested at BIS-recognized laboratory.",
                    "Step 3: Factory inspection verifies quality control infrastructure.",
                    "Step 4: BIS grants IS licence upon successful compliance."
                ],
                "next_step": "Apply at manakonline.in and select the applicable Indian Standard for your product."
            }
        }
    },
    "bis-rules-2018": {
        "standard_code": "BIS Rules, 2018",
        "title": "Bureau of Indian Standards Rules, 2018",
        "pdf_url": "/documents/BIS_Rules_2018.pdf",
        "clauses": {
            "rule-37": {
                "clause_name": "Rule 37",
                "clause_title": "Appeals & Grievance Mechanism",
                "page": 18,
                "summary": "Any person aggrieved by a BIS decision may file an appeal to the Director General within 30 days.",
                "key_points": [
                    "Appeal must be filed within 30 days of the decision.",
                    "Appeal submitted to the Director General, BIS.",
                    "Accompanied by prescribed fee and documentary evidence.",
                    "Covers licence refusals, revocations, and penalty orders."
                ],
                "next_step": "Draft the appeal citing specific regulation violations and submit to BIS DG office with supporting evidence."
            }
        }
    }
}

# ── Library Document Catalogue ────────────────────────────────────────────
# All documents available in the BISathi Document Library
LIBRARY_DOCS = {
    "is-456-2000":                    {"title": "IS 456:2000",                             "page": 18},
    "is-302-1-2018":                  {"title": "IS 302 (Part 1):2018",                   "page": 12},
    "bis-act-2016":                   {"title": "BIS Act, 2016",                           "page": 8},
    "bis-rules-2018":                 {"title": "BIS Rules, 2018",                         "page": 49},
    "bis-ca-regulations-2018":        {"title": "BIS CA Regulations, 2018",               "page": 243},
    "bis-hallmarking-regulations-2018":{"title": "BIS Hallmarking Regulations, 2018",    "page": 52},
    "bis-hallmarking-amendment-2022": {"title": "BIS Hallmarking Amendment 2022",        "page": 3},
    "bis-marking-fee-notification-2021":{"title": "BIS Marking Fee Notification 2021",  "page": 3},
    "bis-simplified-procedure":       {"title": "BIS Simplified Procedure",               "page": 1},
    "bis-lab-recognition-scheme":     {"title": "BIS Lab Recognition Scheme 2020",       "page": 1},
    "bis-advisory-committees-regulations":{"title": "BIS Advisory Committees Reg. 2020","page": 3},
}

# ── System Prompt ────────────────────────────────────────────────────────────
BIS_SYSTEM_PROMPT = """You are BISathi AI — an authoritative, evidence-first assistant for Bureau of Indian Standards (BIS), Indian Standards, certification, hallmarking, testing laboratories, and regulatory compliance in India.

CORE RULES:
1. Answer based on verifiable BIS regulations, Indian Standards (IS codes), and official gazette notifications.
2. Always cite the relevant IS code, clause number, or BIS regulation in your response.
3. If you are unsure or the information is not in your knowledge, say so clearly — never fabricate standards or clause numbers.
4. Keep responses clear, structured, and actionable for Indian manufacturers, MSMEs, jewellers, importers, and consumers.
5. Use Indian regulatory terminology: QCO, ISI Mark, HUID, AHC, FMCS, STI, Scheme-I, Manakonline, etc.
6. Respond in the same language the user writes in (English or Hindi).
7. IMPORTANT: When a user asks for a document from the library, tell them EXACTLY which documents are available below — never say you cannot provide documents. They are available in the BISathi Document Library and can be opened with one click.

DOCUMENTS AVAILABLE IN THE BISATHI DOCUMENT LIBRARY (these can be opened directly in the app):
- IS 456:2000 — Plain and Reinforced Concrete Code of Practice
- IS 302 (Part 1):2018 — Safety of Household Electrical Appliances
- BIS Act, 2016 — National Standards Body Statute (QCOs, Sec 16, Sec 29 penalties)
- BIS Rules, 2018 — Standard Formulation, Appeals (Rule 37)
- BIS CA Regulations, 2018 — Conformity Assessment: Scheme-I, Scheme-IV, FMCS
- BIS Hallmarking Regulations, 2018 — Jeweller Registration, AHC, HUID, Purity Marks
- BIS Hallmarking Amendment 2022 — Schedule IV Hallmarking Fees (₹45/gold, ₹35/silver)
- BIS Marking Fee Notification 2021 — 20%/50% concessions for Micro/Startup/Women units
- BIS Simplified Procedure — Fast-track 30-day certification product list
- BIS Lab Recognition Scheme 2020 — NABL/ISO 17025 lab empanelment guidelines
- BIS Advisory Committees Regulations 2020 — Governance & advisory committee rules

KEY KNOWLEDGE AREAS:
- BIS Act 2016 & BIS Rules 2018 (Section 16 QCOs, Section 29 penalties, Rule 37 appeals)
- Indian Standards (IS codes) for products, materials, safety
- BIS Product Certification: Scheme-I (normal), Scheme-IV (FMCS for foreign manufacturers), Simplified Procedure (30-day fast track)
- Gold & Silver Hallmarking: HUID, AHC registration, purity grades (22K916, 18K750, 14K585)
- Testing Laboratories: BIS LRS:2020, NABL accreditation, ISO/IEC 17025
- Quality Control Orders (QCOs) — mandatory certification for 700+ product categories
- Marking fee concessions: 50% for startups/women entrepreneurs, 20% for micro units

FORMAT RULES:
- Use **bold** for important terms, IS codes, clause numbers, and values.
- Use numbered lists for step-by-step processes.
- Use bullet lists for multiple items or key facts.
- Use ### for section headings when response has multiple parts.
- Keep paragraphs short and scannable.
- When listing documents available in the library, mention them naturally and note the user can open them with one click."""


class EvidenceService:
    def __init__(self):
        self._client = None

    def _get_client(self):
        """Lazy-initialize Gemini client."""
        if self._client is None:
            try:
                from google import genai
                self._client = genai.Client(api_key=settings.GEMINI_API_KEY)
            except Exception as e:
                print(f"[BISathi] Gemini client init failed: {e}")
                self._client = None
        return self._client

    def _build_context(self, doc_context_id: Optional[str] = None) -> str:
        """Build grounding context from knowledge base for a given document."""
        if not doc_context_id or doc_context_id not in KNOWLEDGE_BASE:
            return ""
        doc = KNOWLEDGE_BASE[doc_context_id]
        lines = [f"\nGROUNDING DOCUMENT: {doc['standard_code']} — {doc['title']}"]
        for c_id, clause in doc["clauses"].items():
            lines.append(f"\n{clause['clause_name']} ({clause['clause_title']}) [Page {clause['page']}]:")
            lines.append(clause["summary"])
            for kp in clause["key_points"]:
                lines.append(f"  • {kp}")
        return "\n".join(lines)

    def _get_best_source(self, doc_context_id: Optional[str], query: str) -> Optional[dict]:
        """Pick the most relevant source from knowledge base for citations."""
        if doc_context_id and doc_context_id in KNOWLEDGE_BASE:
            doc = KNOWLEDGE_BASE[doc_context_id]
            q = query.lower()
            for c_id, clause in doc["clauses"].items():
                if c_id in q or clause["clause_title"].lower() in q:
                    return {"doc_id": doc_context_id, "clause": clause, "doc": doc}
            # Return first clause as default
            first_clause = list(doc["clauses"].values())[0]
            return {"doc_id": doc_context_id, "clause": first_clause, "doc": doc}
        return None

    def _detect_document(self, query: str) -> Optional[str]:
        """Detect which BIS document is most relevant to the query."""
        q = query.lower()
        if re.search(r"\b(is\s*456|concrete|cube|compressive|reinforce)\b", q):
            return "is-456-2000"
        if re.search(r"\b(is\s*302|appliance|electrical safety|leakage)\b", q):
            return "is-302-1-2018"
        if re.search(r"\b(hallmark|huid|gold|silver|jewel|carat|916|750|585|ahc)\b", q):
            return "bis-hallmarking-regulations-2018"
        if re.search(r"\b(penalty|section 29|section 16|bis act|imprisonment|fine)\b", q):
            return "bis-act-2016"
        if re.search(r"\b(scheme.?i|certification process|factory audit|fmcs|sti|manakonline)\b", q):
            return "bis-ca-regulations-2018"
        if re.search(r"\b(appeal|rule 37|grievance|aggrieved|director general)\b", q):
            return "bis-rules-2018"
        return None

    def _fallback_response(self, query: str, doc_context_id: Optional[str]) -> ChatResponse:
        """Deterministic fallback when Gemini is unavailable."""
        source_info = self._get_best_source(doc_context_id, query)
        if source_info:
            clause = source_info["clause"]
            doc = source_info["doc"]
            return ChatResponse(
                answer=f"Within {doc['standard_code']}, {clause['clause_name']} ({clause['clause_title']}) establishes: {clause['summary']}",
                key_points=clause["key_points"],
                sources=[CitationSource(
                    document_id=source_info["doc_id"],
                    document_name=doc["standard_code"],
                    standard_number=doc["standard_code"],
                    clause=clause["clause_name"],
                    page=clause["page"],
                    pdf_url=doc.get("pdf_url", f"/documents/{source_info['doc_id']}.pdf")
                )],
                next_step=clause["next_step"],
                confidence="supported",
                needs_verification=False
            )
        return ChatResponse(
            answer=f"I can help with BIS standards, certification, hallmarking, and regulatory compliance. Could you rephrase your question or include a standard number like 'IS 456' or mention the topic (e.g. 'hallmarking', 'certification process', 'QCO')?",
            key_points=[
                "Ask about any IS standard code (e.g. IS 456, IS 302).",
                "Ask about BIS certification process (Scheme-I, Simplified Procedure).",
                "Ask about gold hallmarking, HUID, AHC registration.",
                "Ask about QCOs, penalties, or appeals under BIS Act 2016."
            ],
            sources=[],
            next_step="Try asking: 'What is the process for BIS certification?' or 'Explain IS 456 clause 7.2'.",
            confidence="not_found",
            needs_verification=False
        )

    def _get_relevant_library_docs(self, query: str, doc_context_id: Optional[str] = None) -> list:
        """Return library docs relevant to the query as LibraryDoc objects."""
        q = query.lower()
        relevant = []

        # Always include the document context if set
        if doc_context_id and doc_context_id in LIBRARY_DOCS:
            info = LIBRARY_DOCS[doc_context_id]
            relevant.append(LibraryDoc(document_id=doc_context_id, title=info["title"], page=info["page"]))

        # Keyword-based relevance matching
        keyword_map = [
            (["is 456", "concrete", "cube", "reinforce", "compressive"], "is-456-2000"),
            (["is 302", "appliance", "electrical safety", "leakage"], "is-302-1-2018"),
            (["bis act", "section 16", "section 29", "qco", "penalty", "fine", "imprisonment"], "bis-act-2016"),
            (["rule 37", "appeal", "grievance", "bis rules"], "bis-rules-2018"),
            (["scheme-i", "scheme i", "factory audit", "fmcs", "sti", "conformity", "ca regulation"], "bis-ca-regulations-2018"),
            (["hallmark", "jewel", "gold", "silver", "huid", "ahc", "carat", "purity", "916", "750", "585"], "bis-hallmarking-regulations-2018"),
            (["hallmarking fee", "schedule iv", "₹45", "₹35", "hallmarking amendment"], "bis-hallmarking-amendment-2022"),
            (["marking fee", "concession", "startup", "women entrepreneur", "micro unit", "50%", "20%"], "bis-marking-fee-notification-2021"),
            (["simplified procedure", "fast track", "30-day", "30 day", "fast-track"], "bis-simplified-procedure"),
            (["lab", "laboratory", "nabl", "17025", "lrs", "testing lab"], "bis-lab-recognition-scheme"),
        ]

        # For generic "document" or "library" requests, return top most-relevant docs
        is_library_request = any(kw in q for kw in ["document", "library", "pdf", "download", "available", "list"])

        for keywords, doc_id in keyword_map:
            if doc_id == doc_context_id:
                continue  # already added
            if is_library_request or any(kw in q for kw in keywords):
                if doc_id in LIBRARY_DOCS:
                    info = LIBRARY_DOCS[doc_id]
                    relevant.append(LibraryDoc(document_id=doc_id, title=info["title"], page=info["page"]))

        # For library/document requests with no specific topic, return all
        if is_library_request and len(relevant) < 3:
            for doc_id, info in LIBRARY_DOCS.items():
                if not any(d.document_id == doc_id for d in relevant):
                    relevant.append(LibraryDoc(document_id=doc_id, title=info["title"], page=info["page"]))

        return relevant[:8]  # Cap at 8 documents

    def answer_query(
        self,
        query: str,
        doc_context_id: Optional[str] = None,
        page: Optional[int] = None,
        history: Optional[list] = None
    ) -> ChatResponse:
        """Main entry point — answer using Gemini AI with BIS grounding."""

        # Auto-detect document context if not provided
        if not doc_context_id:
            doc_context_id = self._detect_document(query)

        # Build grounding context
        context = self._build_context(doc_context_id)
        page_hint = f"\n[User is currently viewing page {page} of the document.]" if page else ""

        # Build full prompt
        full_prompt = f"{context}{page_hint}\n\nUser question: {query}"

        # Compute relevant library docs
        library_docs = self._get_relevant_library_docs(query, doc_context_id)

        # Try Gemini AI
        client = self._get_client()
        if client and settings.GEMINI_API_KEY:
            try:
                from google.genai import types as genai_types

                # Build multi-turn contents list from history + current message
                contents = []
                for turn in (history or []):
                    role = turn.get("role", "user") if isinstance(turn, dict) else turn.role
                    text = turn.get("text", "") if isinstance(turn, dict) else turn.text
                    # Map 'bot'/'assistant' -> 'model' for Gemini
                    if role in ("bot", "assistant"):
                        role = "model"
                    contents.append(genai_types.Content(
                        role=role,
                        parts=[genai_types.Part(text=text)]
                    ))

                # Append the current user turn (with grounding context)
                contents.append(genai_types.Content(
                    role="user",
                    parts=[genai_types.Part(text=full_prompt)]
                ))

                response = client.models.generate_content(
                    model=settings.GEMINI_MODEL,
                    contents=contents,
                    config=genai_types.GenerateContentConfig(
                        system_instruction=BIS_SYSTEM_PROMPT,
                        temperature=0.3,
                        max_output_tokens=1200,
                    )
                )
                ai_text = response.text.strip()

                # Build citation from knowledge base if available
                source_info = self._get_best_source(doc_context_id, query)
                sources = []
                if source_info:
                    clause = source_info["clause"]
                    doc = source_info["doc"]
                    sources = [CitationSource(
                        document_id=source_info["doc_id"],
                        document_name=doc["standard_code"],
                        standard_number=doc["standard_code"],
                        clause=clause["clause_name"],
                        page=clause["page"],
                        pdf_url=doc.get("pdf_url", f"/documents/{source_info['doc_id']}.pdf")
                    )]

                return ChatResponse(
                    answer=ai_text,
                    key_points=[],
                    sources=sources,
                    library_docs=library_docs,
                    next_step="Click any document chip above to open it in the Document Viewer, or click 'Inspect source' on a citation.",
                    confidence="supported",
                    needs_verification=False
                )

            except Exception as e:
                print(f"[BISathi] Gemini API error: {e}")
                # Fall through to deterministic fallback

        # Deterministic fallback
        fallback = self._fallback_response(query, doc_context_id)
        fallback.library_docs = library_docs
        return fallback


evidence_service = EvidenceService()
