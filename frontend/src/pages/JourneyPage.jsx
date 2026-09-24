import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  BookOpen, 
  FlaskConical, 
  FileCheck2,
  Download
} from 'lucide-react';

export default function JourneyPage({ onOpenDocument, onNavigateTab }) {
  const [productType, setProductType] = useState('concrete');

  const journeys = {
    concrete: {
      product: "Structural Concrete & Cement",
      standard: "IS 456:2000 (Plain and Reinforced Concrete)",
      standardId: "is-456-2000",
      page: 18,
      clause: "Clause 7.2",
      testing: "28-day Compressive Strength, Workability (IS 1199), Aggregates Grading (IS 383)",
      lab: "National Materials Testing Centre (Ahmedabad)",
      status: "Ready for Testing Setup",
      steps: [
        { label: "Product Identified", done: true, detail: "Structural concrete mixes (M20 to M50)" },
        { label: "Applicable Standard Found", done: true, detail: "IS 456:2000 Code of Practice" },
        { label: "Testing Requirements Found", done: true, detail: "Clause 7.2 & Table 11 Sampling Frequency" },
        { label: "Laboratory Matching", done: false, detail: "National Materials Testing Centre in Ahmedabad" },
        { label: "Manakonline Filing", done: false, detail: "Submit Scheme-I application with test certificates" }
      ]
    },
    appliances: {
      product: "Household Electric Appliances",
      standard: "IS 302 (Part 1):2018 (Safety of Household Appliances)",
      standardId: "is-302-1-2018",
      page: 12,
      clause: "Clause 4.1",
      testing: "Electric Strength at Operating Temp (Clause 13), Leakage Current, Ingress Protection",
      lab: "Electrical Safety Test Laboratory (Mumbai)",
      status: "Safety Verification Phase",
      steps: [
        { label: "Product Identified", done: true, detail: "Domestic immersion heaters & kettles" },
        { label: "Applicable Standard Found", done: true, detail: "IS 302 (Part 1):2018 General Safety" },
        { label: "Testing Requirements Found", done: true, detail: "Clause 4 General Principles & Clause 7 Marking" },
        { label: "Laboratory Matching", done: false, detail: "Electrical Safety Test Laboratory in Mumbai" },
        { label: "Manakonline Filing", done: false, detail: "Apply under Compulsory Registration Scheme (CRS)" }
      ]
    },
    hallmarking: {
      product: "Gold & Precious Metal Jewellery",
      standard: "IS 1417 & IS 15820 (Hallmarking & AHC Standards)",
      standardId: "bis-hallmarking-guide",
      page: 7,
      clause: "Clause 3.1",
      testing: "Fire Assay Purity Testing & 6-digit HUID Laser Marking",
      lab: "BIS Recognized Assaying & Hallmarking Centres (AHC)",
      status: "HUID Compliance Phase",
      steps: [
        { label: "Product Identified", done: true, detail: "Gold Jewellery (22K, 18K, 14K)" },
        { label: "Applicable Standard Found", done: true, detail: "IS 1417 Purity Grades" },
        { label: "Testing Requirements Found", done: true, detail: "Clause 3.1 HUID 6-Digit Inscription" },
        { label: "Laboratory Matching", done: false, detail: "Locate nearest registered AHC center" },
        { label: "Manakonline Filing", done: false, detail: "Jeweler registration on Manakonline portal" }
      ]
    }
  };

  const currentJourney = journeys[productType];

  return (
    <div className="page-container">
      <div className="eyebrow-badge">GUIDED COMPLIANCE WORKFLOW</div>
      <h1 className="page-title">My BIS Journey</h1>
      <p className="page-subtitle">
        Track your product compliance roadmap step-by-step from identification to BIS certification.
      </p>

      {/* Preset Product Selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        <button 
          className={`prompt-pill-btn ${productType === 'concrete' ? 'active' : ''}`}
          style={productType === 'concrete' ? { backgroundColor: '#0B192C', color: '#FFFFFF', borderColor: '#0B192C' } : {}}
          onClick={() => setProductType('concrete')}
        >
          Construction & Concrete (IS 456)
        </button>
        <button 
          className={`prompt-pill-btn ${productType === 'appliances' ? 'active' : ''}`}
          style={productType === 'appliances' ? { backgroundColor: '#0B192C', color: '#FFFFFF', borderColor: '#0B192C' } : {}}
          onClick={() => setProductType('appliances')}
        >
          Electrical Appliances (IS 302)
        </button>
        <button 
          className={`prompt-pill-btn ${productType === 'hallmarking' ? 'active' : ''}`}
          style={productType === 'hallmarking' ? { backgroundColor: '#0B192C', color: '#FFFFFF', borderColor: '#0B192C' } : {}}
          onClick={() => setProductType('hallmarking')}
        >
          Gold Hallmarking (HUID)
        </button>
      </div>

      {/* Journey Card */}
      <div className="pathway-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '18px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', letterSpacing: '1px' }}>
              ACTIVE COMPLIANCE TRACK
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {currentJourney.product}
            </h2>
          </div>
          <span className="status-pill status-pill-green">
            <CheckCircle2 size={13} />
            {currentJourney.status}
          </span>
        </div>

        {/* 5 Stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {currentJourney.steps.map((step, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: step.done ? '#F0FDF4' : '#F8FAFC',
                border: step.done ? '1px solid #BBF7D0' : '1px solid #E2E8F0'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: step.done ? '#10B981' : '#E2E8F0',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                marginTop: '2px',
                flexShrink: 0
              }}>
                {step.done ? '✓' : idx + 1}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A' }}>
                  {step.label}
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
                  {step.detail}
                </div>
              </div>

              {step.done && idx === 1 && (
                <button 
                  className="action-link"
                  onClick={() => onOpenDocument(currentJourney.standardId, currentJourney.page, currentJourney.clause)}
                >
                  <span>Open clause</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Next Action Callout */}
        <div style={{
          marginTop: '24px',
          padding: '18px',
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E3A8A' }}>
              Recommended Next Action:
            </div>
            <div style={{ fontSize: '13px', color: '#3B82F6', marginTop: '2px' }}>
              Schedule compliance pre-testing with <strong>{currentJourney.lab}</strong>.
            </div>
          </div>
          <button 
            className="action-link"
            style={{ backgroundColor: '#1E3A8A', color: '#FFFFFF', padding: '8px 16px', borderRadius: '6px' }}
            onClick={() => onNavigateTab('laboratories')}
          >
            <span>View Testing Lab</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
