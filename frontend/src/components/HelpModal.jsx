import React from 'react';
import { X, ShieldCheck, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#FEF3C7',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/images/branding/bisathi-icon-transparent.png" alt="BISathi" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>About BISathi</h3>
          </div>
          <button onClick={onClose} style={{ color: '#64748B', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.55, marginBottom: '16px' }}>
          <strong>BISathi</strong> (BIS + Saathi) is an evidence-grounded AI document intelligence platform for Indian Standards, certification routes, and testing laboratories.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <CheckCircle2 size={16} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div style={{ fontSize: '12.5px', color: '#334155' }}>
              <strong>Evidence-First:</strong> Every factual claim is directly traceable to an authorized BIS document, clause, and page.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Layers size={16} color="#0284C7" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div style={{ fontSize: '12.5px', color: '#334155' }}>
              <strong>40% / 60% Split View:</strong> Click any citation or document card to inspect the exact standard clause beside your chat.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <BookOpen size={16} color="#D97706" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div style={{ fontSize: '12.5px', color: '#334155' }}>
              <strong>Hallucination Guard:</strong> Never invents standard numbers, clauses, or regulatory obligations.
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0B192C',
            color: '#FFFFFF',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '13.5px'
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
