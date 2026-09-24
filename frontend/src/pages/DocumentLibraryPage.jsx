import React, { useState } from 'react';
import { Search, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { MOCK_DOCUMENTS } from '../data/bisData';

export default function DocumentLibraryPage({ onOpenDocument }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      {/* Eyebrow & Title matching Image 3 */}
      <div className="eyebrow-badge">SOURCE LIBRARY</div>
      <h1 className="page-title">Documents that make answers<br />accountable.</h1>
      <p className="page-subtitle">
        Browse the references behind BISathi's answers. Open any record to read the relevant page beside your conversation.
      </p>

      {/* Search Input matching Image 3 */}
      <div className="search-container">
        <Search size={18} color="#94A3B8" />
        <input 
          type="text"
          className="search-input"
          placeholder="Search standards, guides and titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-count">{filteredDocs.length} sources</span>
      </div>

      {/* Document Grid matching Image 3 */}
      <div className="document-grid">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="doc-card">
            <div>
              <div className="doc-card-header">
                <div className="doc-icon-box">
                  <FileText size={20} />
                </div>
                <span className="status-pill status-pill-amber">
                  {doc.tag}
                </span>
              </div>

              <h3 className="doc-card-title">{doc.title}</h3>
              <div className="doc-card-sub">{doc.subtitle}</div>
              <p className="doc-card-desc">{doc.description}</p>
            </div>

            <div className="doc-card-footer">
              <span className="status-pill status-pill-green" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                <CheckCircle2 size={15} />
                <span>{doc.status}</span>
              </span>

              <button 
                className="action-link"
                onClick={() => onOpenDocument(doc.id, doc.defaultPage, doc.defaultClause)}
              >
                <span>Open source</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
