import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, FileText, ArrowRight } from 'lucide-react';
import { MOCK_CERTIFICATION_STEPS } from '../data/bisData';

export default function CertificationPage({ onOpenDocument, onAskAssistant }) {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (stepNumber) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <div className="page-container">
      {/* Eyebrow & Title matching Image 4 */}
      <div className="eyebrow-badge">CERTIFICATION PATHWAYS</div>
      <h1 className="page-title">Know the route before you take it.</h1>
      <p className="page-subtitle">
        Start with verified pathway information, then open the source that supports each step.
      </p>

      {/* Pathway Stepper Card matching Image 4 */}
      <div className="pathway-card">
        {MOCK_CERTIFICATION_STEPS.map((step) => {
          const isExpanded = expandedStep === step.stepNumber;
          return (
            <div key={step.stepNumber} className="pathway-step-row" style={{ display: 'block' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  justifyContent: 'space-between',
                  cursor: 'pointer' 
                }}
                onClick={() => toggleStep(step.stepNumber)}
              >
                <div className="pathway-left">
                  <div className="step-circle">{step.stepNumber}</div>
                  <div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.description}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className={`status-pill ${step.badgeType === 'amber' ? 'status-pill-amber' : 'status-pill-gray'}`}>
                    {step.badge}
                  </span>
                  {isExpanded ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </div>
              </div>

              {/* Collapsible Guidance & Reference Details */}
              {isExpanded && (
                <div style={{
                  marginLeft: '60px',
                  marginTop: '16px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '18px 20px'
                }}>
                  <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.5, marginBottom: '14px' }}>
                    {step.details}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#64748B' }}>
                      <FileText size={14} color="#0284C7" />
                      <span>Reference: <strong>{step.relatedStandard}</strong> ({step.clauseRef})</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="action-link" 
                        style={{ fontSize: '12.5px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAskAssistant(`Explain step ${step.stepNumber}: ${step.title}`);
                        }}
                      >
                        <span>Ask AI Assistant</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
