import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  FileText, 
  Sparkles,
  Search,
  Download,
  Loader2,
  Check
} from 'lucide-react';
import { DOCUMENT_PAGES_DATA, MOCK_DOCUMENTS } from '../data/bisData';

export default function DocumentViewer({ 
  documentId, 
  initialPage = 18, 
  targetClause = null, 
  onClose, 
  onPageChange,
  onAskAboutPage,
  askStatus = 'idle'
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');

  // Update page if parent changes initialPage
  useEffect(() => {
    if (initialPage) {
      setCurrentPage(initialPage);
    }
  }, [initialPage, documentId]);

  const docMeta = MOCK_DOCUMENTS.find(d => d.id === documentId) || MOCK_DOCUMENTS[0];
  const docPages = DOCUMENT_PAGES_DATA[documentId] || DOCUMENT_PAGES_DATA['is-456-2000'];
  const totalPages = docPages.totalPages || 114;
  
  // Find current page content or fallback to default page 18
  const activePageData = docPages.pages[currentPage] || docPages.pages[18] || Object.values(docPages.pages)[0];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const nextP = currentPage - 1;
      setCurrentPage(nextP);
      if (onPageChange) onPageChange(nextP);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextP = currentPage + 1;
      setCurrentPage(nextP);
      if (onPageChange) onPageChange(nextP);
    }
  };

  return (
    <div className="workspace-right-doc">
      {/* Document Viewer Header / Toolbar */}
      <div className="doc-viewer-header">
        <div className="doc-viewer-title-group">
          <span className="doc-viewer-badge">{docMeta.standardCode}</span>
          <span className="doc-viewer-name">{docMeta.title}</span>
        </div>

        <div className="doc-viewer-controls">
          {/* Page Navigation */}
          <button 
            className="doc-tool-btn" 
            onClick={handlePrevPage} 
            disabled={currentPage <= 1}
            title="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>
          <span style={{ fontSize: '12.5px', color: '#334155', fontWeight: 600, padding: '0 4px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="doc-tool-btn" 
            onClick={handleNextPage} 
            disabled={currentPage >= totalPages}
            title="Next Page"
          >
            <ChevronRight size={16} />
          </button>

          <div style={{ width: '1px', height: '20px', backgroundColor: '#E2E8F0', margin: '0 4px' }} />

          {/* Zoom controls */}
          <button 
            className="doc-tool-btn" 
            onClick={() => setZoomLevel(prev => Math.max(75, prev - 10))}
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
          <span style={{ fontSize: '11.5px', color: '#64748B', width: '38px', textAlign: 'center' }}>
            {zoomLevel}%
          </span>
          <button 
            className="doc-tool-btn" 
            onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>

          <div style={{ width: '1px', height: '20px', backgroundColor: '#E2E8F0', margin: '0 4px' }} />

          {/* Close Document Viewer */}
          <button className="doc-close-btn" onClick={onClose} title="Close Split Document View">
            <X size={15} />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Document Scroll Canvas */}
      <div className="doc-canvas-scroll">
        <div 
          className="doc-paper-page" 
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* BIS Document Letterhead */}
          <div className="doc-paper-header">
            <div>
              <div className="doc-bis-crest">BUREAU OF INDIAN STANDARDS</div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                MANAK BHAVAN, 9 BAHADUR SHAH ZAFAR MARG, NEW DELHI 110002
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#0F172A' }}>
                {docPages.standardCode}
              </div>
              <div className="doc-page-num">PAGE {currentPage}</div>
            </div>
          </div>

          {/* Page Section Banner */}
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '18px',
            borderBottom: '1px solid #E2E8F0',
            paddingBottom: '6px'
          }}>
            {activePageData?.sectionHeader || `${docPages.standardCode} — SECTION RECORD`}
          </div>

          {/* Clauses Content */}
          {activePageData?.clauses ? (
            activePageData.clauses.map((c) => {
              const isTarget = c.highlighted || (targetClause && c.clause.includes(targetClause));
              return (
                <div 
                  key={c.id} 
                  className={`doc-clause-block ${isTarget ? 'highlighted' : ''}`}
                >
                  <div className="doc-clause-title">
                    {c.clause}
                    {isTarget && (
                      <span style={{
                        marginLeft: '10px',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        backgroundColor: '#CA8A04',
                        color: '#FFFFFF',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        Cited Evidence
                      </span>
                    )}
                  </div>
                  <p className="doc-clause-text">{c.text}</p>

                  {/* Sub-clauses */}
                  {c.subClauses && (
                    <div style={{ marginTop: '10px', paddingLeft: '14px' }}>
                      {c.subClauses.map((sub, i) => (
                        <p key={i} style={{ fontSize: '13.5px', color: '#475569', marginBottom: '6px', lineHeight: 1.5 }}>
                          {sub}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Tables */}
                  {c.table && (
                    <div style={{ marginTop: '16px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12.5px', color: '#0F172A', marginBottom: '6px' }}>
                        {c.table.title}
                      </div>
                      <table className="doc-table">
                        <thead>
                          <tr>
                            {c.table.headers.map((h, idx) => (
                              <th key={idx}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {c.table.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748B' }}>
              <FileText size={40} color="#94A3B8" style={{ margin: '0 auto 12px auto', display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: '15px' }}>Official Text for Page {currentPage}</p>
              <p style={{ fontSize: '13px', marginTop: '4px' }}>
                Standard technical specifications and requirements conforming to {docPages.standardCode}.
              </p>
            </div>
          )}
        </div>

        {/* Floating Quick Action Banner */}
        <div className="doc-ask-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="#38BDF8" />
            <span style={{ fontSize: '13px', fontWeight: 500 }}>
              Need clarification on Page {currentPage}?
            </span>
          </div>
          <button 
            className={`doc-ask-banner-btn ${askStatus === 'success' ? 'success' : ''}`}
            onClick={() => onAskAboutPage(docPages.standardCode, currentPage)}
            disabled={askStatus === 'loading'}
            title="Ask BISathi AI to analyze and explain this page"
          >
            {askStatus === 'loading' && (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Asking AI...</span>
              </>
            )}
            {askStatus === 'success' && (
              <>
                <Check size={14} />
                <span>Asked ✓</span>
              </>
            )}
            {askStatus === 'idle' && (
              <span>Ask about this page</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
