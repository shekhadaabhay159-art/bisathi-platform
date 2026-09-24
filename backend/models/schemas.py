from pydantic import BaseModel, Field
from typing import List, Optional, Any

class HistoryMessage(BaseModel):
    role: str = Field(..., description="'user' or 'model'")
    text: str = Field(..., description="Message content")

class ChatMessageRequest(BaseModel):
    message: str = Field(..., description="Natural language question from user")
    history: Optional[List[HistoryMessage]] = Field(default=[], description="Prior conversation turns")

class DocumentChatRequest(BaseModel):
    message: str = Field(..., description="Question scoped to the active document")
    page: Optional[int] = Field(None, description="Current page in Document Viewer")
    history: Optional[List[HistoryMessage]] = Field(default=[], description="Prior conversation turns")

class CitationSource(BaseModel):
    document_id: str
    document_name: str
    standard_number: Optional[str] = None
    clause: Optional[str] = None
    page: Optional[int] = None
    pdf_url: Optional[str] = None

class LibraryDoc(BaseModel):
    document_id: str
    title: str
    page: Optional[int] = 1

class ChatResponse(BaseModel):
    answer: str
    key_points: Optional[List[str]] = []
    sources: List[CitationSource] = []
    library_docs: Optional[List[LibraryDoc]] = []
    next_step: Optional[str] = None
    confidence: str = "supported"
    needs_verification: bool = False

class StandardItem(BaseModel):
    id: str
    number: str
    tag: str
    standard_code: str
    title: str
    description: str
    category: str
    year: int
    page_count: int
    default_clause: str
    default_page: int
    pdf_url: str

class LabItem(BaseModel):
    id: str
    name: str
    city: str
    state: str
    categories: List[str]
    status: str
    verified: bool
    action_text: str
    address: str
    accreditation: str

class PathwayStep(BaseModel):
    step_number: str
    title: str
    description: str
    badge: str
    badge_type: str
    details: str
    related_standard: str
    clause_ref: str
