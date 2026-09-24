import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { 
  ShieldCheck, 
  Send, 
  Check, 
  Sparkles, 
  History, 
  Plus, 
  Trash2, 
  Clock, 
  Search, 
  MessageSquare, 
  X,
  FileText,
  ChevronRight
} from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import { askChat } from '../services/api';
import { DEFAULT_CHAT_SESSIONS } from '../data/defaultChatHistory';

const AIAssistantPage = forwardRef(function AIAssistantPage({ 
  onOpenDocument, 
  documentContext = null,
  isSplitView = false,
  initialQuery = null,
  onClearInitialQuery = null
}, ref) {
  // Load Saved Chat Sessions from localStorage or initialize with verified defaults
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('bisathi_chat_history_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_CHAT_SESSIONS;
  });

  // Active Session ID
  const [activeSessionId, setActiveSessionId] = useState(() => {
    if (documentContext?.document_id === 'is-456-2000') {
      return 'session-is456-clause72';
    }
    return DEFAULT_CHAT_SESSIONS[0]?.id || 'session-is456-clause72';
  });

  // Toggle state for Chat History Drawer / Sidebar
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState('');

  // Active session object
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0] || {
    id: 'default',
    title: 'New Regulatory Consultation',
    messages: [
      {
        id: 'welcome',
        sender: 'bot',
        isWelcome: true,
        text: "Welcome to BISathi. I can help you find relevant BIS standards, understand certification pathways, and verify answers against source documents."
      }
    ]
  };

  const messages = activeSession.messages || [];

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPills = [
    "Which standard applies to my product?",
    "Explain certification",
    "Verify a hallmark"
  ];

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('bisathi_chat_history_v2', JSON.stringify(sessions));
    } catch (e) {}
  }, [sessions]);

  // If documentContext changes to a specific document, sync active session
  useEffect(() => {
    if (documentContext?.document_id) {
      const matchingSession = sessions.find(s => s.document_id === documentContext.document_id);
      if (matchingSession && matchingSession.id !== activeSessionId) {
        setActiveSessionId(matchingSession.id);
      }
    }
  }, [documentContext?.document_id]);

  // If initialQuery is passed from search, trigger immediately
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Create a New Chat Session
  const handleNewChat = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession = {
      id: newSessionId,
      title: 'New Consultation',
      timestamp: 'Just now',
      document_id: documentContext?.document_id || null,
      page: documentContext?.page || null,
      clause: documentContext?.clause || null,
      messages: [
        {
          id: 'welcome',
          sender: 'bot',
          isWelcome: true,
          text: "Welcome to BISathi. I can help you find relevant BIS standards, understand certification pathways, and verify answers against source documents."
        }
      ]
    };

    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setInputText('');
    setHistoryOpen(false);
  };

  // Delete a Session
  const handleDeleteSession = (sessionId, e) => {
    e.stopPropagation();
    if (sessions.length <= 1) {
      handleNewChat();
      return;
    }
    const filtered = sessions.filter(s => s.id !== sessionId);
    setSessions(filtered);
    if (activeSessionId === sessionId) {
      setActiveSessionId(filtered[0]?.id || '');
    }
  };

  // Select a Session from History
  const handleSelectSession = (session) => {
    setActiveSessionId(session.id);
    setHistoryOpen(false);
    if (session.document_id && onOpenDocument) {
      onOpenDocument(session.document_id, session.page || 1, session.clause || null);
    }
  };

  // Send query and update session messages
  const handleSend = async (textToSend = null, explicitContext = null) => {
    const query = (textToSend || inputText).trim();
    if (!query || loading) return;

    const activeContext = explicitContext || documentContext;

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    // Update active session with user message
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        // If it was a new consultation, rename title with user's first query
        const isNew = s.title === 'New Consultation' || s.title === 'New Regulatory Consultation';
        return {
          ...s,
          title: isNew ? (query.length > 38 ? query.substring(0, 38) + '...' : query) : s.title,
          timestamp: 'Just now',
          messages: [...(s.messages || []), userMsg]
        };
      }
      return s;
    }));

    setInputText('');
    setLoading(true);
    setTimeout(scrollToBottom, 50);

    try {
      // Capture the messages BEFORE adding this user turn so history = all prior turns
      const currentMessages = activeSession.messages || [];
      const response = await askChat(query, activeContext, currentMessages);

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        answer: response.answer,
        key_points: response.key_points,
        sources: response.sources,
        next_step: response.next_step,
        confidence: response.confidence
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [...(s.messages || []), botMsg]
          };
        }
        return s;
      }));
    } catch (err) {
      console.error(err);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        answer: "Unable to verify this information from the available authorized BIS sources.",
        key_points: ["System strictly adheres to BISathi Hallucination Policy."],
        next_step: "Try searching for an authorized standard code like 'IS 456' or 'IS 302'."
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [...(s.messages || []), errorMsg]
          };
        }
        return s;
      }));
    } finally {
      setLoading(false);
      setTimeout(scrollToBottom, 50);
    }
  };

  useImperativeHandle(ref, () => ({
    sendQuery: (queryText, explicitContext = null) => {
      return handleSend(queryText, explicitContext);
    }
  }));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Filter sessions by search term
  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(historySearch.toLowerCase()) ||
    (s.clause && s.clause.toLowerCase().includes(historySearch.toLowerCase()))
  );

  return (
    <div className={isSplitView ? "workspace-left-chat" : "page-container"}>
      <div className="chat-container" style={{ position: 'relative' }}>
        
        {/* ================= HEADER SECTION ================= */}
        {!isSplitView ? (
          /* Full Page Header */
          <div className="assistant-header-row">
            <div>
              <div className="eyebrow-badge">
                <Sparkles size={13} />
                EVIDENCE-GROUNDED ASSISTANT
              </div>
              <h1 className="page-title">
                Understand BIS,<br />
                <span className="title-gradient">with confidence.</span>
              </h1>
              <p className="page-subtitle" style={{ marginBottom: '12px' }}>
                Ask a question and trace every important answer back to authorized Gazette clauses.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                type="button"
                className="chat-history-toggle-btn"
                onClick={() => setHistoryOpen(!historyOpen)}
                title="View Chat History"
              >
                <History size={15} />
                <span>Chat History ({sessions.length})</span>
              </button>

              <button 
                type="button"
                className="chat-new-btn"
                onClick={handleNewChat}
                title="Start a New Chat"
              >
                <Plus size={15} />
                <span>New Chat</span>
              </button>

              <div className="status-pill status-pill-green" style={{ padding: '6px 12px' }}>
                <ShieldCheck size={14} />
                <span>Source-aware</span>
              </div>
            </div>
          </div>
        ) : (
          /* Split View Header */
          <div className="split-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', letterSpacing: '1px' }}>
                DOCUMENT-AWARE CHAT
              </span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Chat History Button in Split View */}
                <button 
                  type="button"
                  className="split-history-btn"
                  onClick={() => setHistoryOpen(!historyOpen)}
                  title="Toggle Chat History"
                >
                  <History size={13} />
                  <span>History ({sessions.length})</span>
                </button>

                {/* + New Chat Button in Split View */}
                <button 
                  type="button"
                  className="split-new-chat-btn"
                  onClick={handleNewChat}
                  title="Start a New Chat"
                >
                  <Plus size={13} />
                  <span>New</span>
                </button>

                <span className="status-pill status-pill-green" style={{ fontSize: '10px', padding: '3px 8px' }}>
                  <ShieldCheck size={11} />
                  Linked
                </span>
              </div>
            </div>

            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={14} color="#3858F9" />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {activeSession.title || 'Interactive Document Workspace'}
              </span>
            </div>
          </div>
        )}

        {/* ================= CHAT HISTORY PANEL / DRAWER ================= */}
        {historyOpen && (
          <div className="chat-history-drawer">
            <div className="history-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <History size={16} color="#3858F9" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Chat History</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  type="button"
                  className="history-add-new-btn"
                  onClick={handleNewChat}
                  title="Start New Chat"
                >
                  <Plus size={13} />
                  <span>New Chat</span>
                </button>
                <button 
                  type="button"
                  className="history-close-btn"
                  onClick={() => setHistoryOpen(false)}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* History Search Box */}
            <div className="history-search-bar">
              <Search size={14} color="#94A3B8" />
              <input 
                type="text"
                placeholder="Search conversations..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
              />
              {historySearch && (
                <button onClick={() => setHistorySearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                  <X size={12} />
                </button>
              )}
            </div>

            {/* History Session List */}
            <div className="history-session-list">
              {filteredSessions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 12px', color: '#94A3B8', fontSize: '12.5px' }}>
                  No past conversations found.
                </div>
              ) : (
                filteredSessions.map((s) => {
                  const isActive = s.id === activeSessionId;
                  return (
                    <div 
                      key={s.id}
                      className={`history-session-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleSelectSession(s)}
                    >
                      <div className="history-item-left">
                        <MessageSquare size={14} color={isActive ? '#3858F9' : '#64748B'} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div className="history-item-content">
                          <span className="history-item-title">{s.title}</span>
                          <div className="history-item-meta">
                            <span className="history-item-time">{s.timestamp}</span>
                            {s.document_id && (
                              <span className="history-item-doc-tag">
                                {s.document_id.replace('bis-', '').toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button 
                        type="button"
                        className="history-delete-btn"
                        onClick={(e) => handleDeleteSession(s.id, e)}
                        title="Delete conversation"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* History Footer */}
            <div className="history-drawer-footer">
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                {sessions.length} Saved Compliance Chats
              </span>
              <button 
                type="button"
                onClick={() => {
                  if (window.confirm("Clear all chat history?")) {
                    localStorage.removeItem('bisathi_chat_history_v2');
                    setSessions(DEFAULT_CHAT_SESSIONS);
                    setActiveSessionId(DEFAULT_CHAT_SESSIONS[0].id);
                  }
                }}
                style={{ background: 'none', border: 'none', fontSize: '11px', color: '#DC2626', cursor: 'pointer', fontWeight: 600 }}
              >
                Reset to Default
              </button>
            </div>
          </div>
        )}

        {/* ================= CHAT MESSAGES LIST ================= */}
        <div className="chat-message-list">
          {messages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
              onOpenDocument={onOpenDocument} 
            />
          ))}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 0' }}>
              <div className="bot-avatar-box">
                <Sparkles size={18} className="animate-spin" />
              </div>
              <span style={{ fontSize: '13px', color: '#64748B', fontStyle: 'italic' }}>
                Verifying authorized BIS sources & extracting statutory clauses...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Pills */}
        {!isSplitView && messages.length <= 2 && (
          <div className="prompt-pills-row">
            {suggestedPills.map((pill, idx) => (
              <button 
                key={idx} 
                className="prompt-pill-btn"
                onClick={() => handleSend(pill)}
              >
                {pill}
              </button>
            ))}
          </div>
        )}

        {/* ================= CHAT INPUT BOX ================= */}
        <div className="chat-input-wrapper">
          <div className="chat-input-top-row">
            <textarea
              className="chat-textarea"
              rows={isSplitView ? 2 : 1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                documentContext?.page 
                  ? `Ask about Page ${documentContext.page} or Clause...` 
                  : "Ask about a standard, clause, certification or lab..."
              }
            />
            <button 
              className="send-btn" 
              onClick={() => handleSend()}
              disabled={!inputText.trim() || loading}
              title="Send query"
            >
              <Send size={16} />
            </button>
          </div>

          <div className="chat-input-footer">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={12} /> Enter to ask &nbsp; Shift + ↵ for a new line
            </span>
          </div>
        </div>

      </div>
    </div>
  );
});

export default AIAssistantPage;
