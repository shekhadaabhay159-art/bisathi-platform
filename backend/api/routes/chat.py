from fastapi import APIRouter, Path
from backend.models.schemas import ChatMessageRequest, DocumentChatRequest, ChatResponse
from backend.services.evidence_service import evidence_service

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatMessageRequest):
    return evidence_service.answer_query(
        request.message,
        history=[h.model_dump() for h in (request.history or [])]
    )

@router.post("/documents/{document_id}/chat", response_model=ChatResponse)
def document_chat_endpoint(
    document_id: str = Path(..., description="Document identifier e.g. is-456-2000"),
    request: DocumentChatRequest = None
):
    msg = request.message if request else "Explain this clause"
    page = request.page if request else 18
    hist = [h.model_dump() for h in (request.history or [])] if request else []
    return evidence_service.answer_query(msg, doc_context_id=document_id, page=page, history=hist)
