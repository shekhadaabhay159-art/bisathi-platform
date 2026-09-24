import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MOCK_STANDARDS } from '../data/bisData';

export default function StandardsPage({ onOpenDocument }) {
  return (
    <div className="page-container">
      {/* Eyebrow & Title matching Image 1 */}
      <div className="eyebrow-badge">KNOWLEDGE BASE</div>
      <h1 className="page-title">Standards finder</h1>
      <p className="page-subtitle">
        Find the standard that gives your work a clear starting point.
      </p>

      {/* Standards List Card matching Image 1 */}
      <div className="standards-card">
        {MOCK_STANDARDS.map((item) => (
          <div key={item.id} className="standard-item">
            <div className="standard-left">
              <span className="standard-number">{item.number}</span>
              <div className="standard-details">
                <span className="standard-tag">{item.tag}</span>
                <h3 className="standard-title">{item.standardCode}</h3>
                <p className="standard-description">{item.title}</p>
              </div>
            </div>

            <button 
              className="action-link"
              onClick={() => onOpenDocument(item.id, item.defaultPage, item.defaultClause)}
            >
              <span>Inspect source</span>
              <ChevronRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
