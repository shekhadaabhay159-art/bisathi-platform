import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  Library, 
  Building2, 
  Gem, 
  FlaskConical, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Clock,
  TrendingDown,
  FileText,
  LogIn,
  UserCheck,
  ChevronRight,
  LogOut,
  Palette
} from 'lucide-react';
import { MOCK_DOCUMENTS } from '../data/bisData';

export default function HomePage({ 
  onGoToAuth, 
  onEnterApp, 
  onOpenDocument, 
  currentUser, 
  onLogout,
  onQuickDemo
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const quickSearchTags = [
    { label: 'IS 456 (Concrete)', id: 'is-456-2000' },
    { label: 'IS 302 (Electrical Appliances)', id: 'is-302-1-2018' },
    { label: 'Gold Hallmarking & HUID', id: 'bis-hallmarking-regulations-2018' },
    { label: '30-Day Simplified Procedure', id: 'bis-simplified-procedure' },
    { label: 'Marking Fee Concessions (20%-50%)', id: 'bis-marking-fee-notification-2021' },
    { label: 'Testing Lab Scheme (LRS:2020)', id: 'bis-lab-recognition-scheme' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (currentUser) {
      onEnterApp('chat');
    } else {
      // If not logged in, pass to auth or instant demo
      onGoToAuth('login');
    }
  };

  const featureCards = [
    {
      title: 'Evidence-Grounded AI Copilot',
      subtitle: 'Zero-Hallucination Policy',
      desc: 'Ask complex regulatory queries and receive answers strictly verified against official Gazette clauses with synchronized split-screen PDF page jumps.',
      icon: Sparkles,
      badge: 'Dual-Pane Sync',
      actionText: 'Launch AI Copilot',
      action: () => currentUser ? onEnterApp('chat') : onGoToAuth('login')
    },
    {
      title: 'Fast-Track Simplified Procedure',
      subtitle: 'Grant of Licence in 30 Days',
      desc: 'Navigate the expedited Scheme-I pathway. Submit pre-tested laboratory reports from accredited facilities to secure certification within a 30-day window.',
      icon: Clock,
      badge: '30-Day Window',
      actionText: 'View Product List',
      action: () => onOpenDocument('bis-simplified-procedure', 1, 'Rule 1')
    },
    {
      title: 'Hallmarking & HUID Engine',
      subtitle: 'Jeweller Liability & Schedule IV',
      desc: 'Understand jeweller registration under Regulation 3, strict purity liability under Regulation 5, 6-digit HUID standards, and official ₹45/gold fee limits.',
      icon: Gem,
      badge: 'Schedule IV Fees',
      actionText: 'Explore Hallmarking Rules',
      action: () => onOpenDocument('bis-hallmarking-regulations-2018', 53, 'Regulation 5')
    },
    {
      title: 'MSME & Startup Concession Engine',
      subtitle: 'Gazette-Backed Fee Discounts',
      desc: 'Automatically factor in official Gazette fee relief: 20% concession for Micro enterprises and 50% concession for DPIIT recognized Startups & Women entrepreneurs.',
      icon: TrendingDown,
      badge: '20% to 50% Off',
      actionText: 'Inspect Concessions',
      action: () => onOpenDocument('bis-marking-fee-notification-2021', 3, 'Concessions')
    },
    {
      title: 'Official Gazette Document Library',
      subtitle: 'Direct Ministry Source Texts',
      desc: 'Browse and inspect authentic Bureau of Indian Standards statutes, including the BIS Act 2016 (No. 11 of 2016), Rules 2018, and 412-page CA Regulations.',
      icon: Library,
      badge: '8 Official Gazettes',
      actionText: 'Open Document Library',
      action: () => currentUser ? onEnterApp('documents') : onOpenDocument('bis-act-2016', 1)
    },
    {
      title: 'Recognized Testing Labs Directory',
      subtitle: 'NABL & BIS LRS:2020 Empanelled',
      desc: 'Locate accredited physical and chemical testing laboratories equipped to conduct mandatory STI test methods across all industrial regions.',
      icon: FlaskConical,
      badge: 'ISO/IEC 17025',
      actionText: 'Find Testing Labs',
      action: () => currentUser ? onEnterApp('laboratories') : onGoToAuth('login')
    }
  ];

  return (
    <div className="home-standalone-page">
      {/* 1. Tricolor Top Ribbon */}
      <div className="tricolor-bar">
        <div className="tri-saffron"></div>
        <div className="tri-white"></div>
        <div className="tri-green"></div>
      </div>

      {/* 2. Public Government Portal Navigation Header */}
      <header className="public-portal-header">
        <div className="public-header-left">
          <div className="emblem-group">
            <div className="portal-brand-logo">
              <img 
                src="/images/branding/favicon-64.png" 
                alt="BISathi Logo" 
                style={{ width: '42px', height: '42px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(19, 34, 49, 0.25)', objectFit: 'contain' }}
              />
            </div>
            <div className="portal-title-block">
              <div className="portal-gov-title">GOVERNMENT OF INDIA • MINISTRY OF CONSUMER AFFAIRS</div>
              <div className="portal-main-title">Bureau of Indian Standards · BISathi</div>
            </div>
          </div>
        </div>

        <nav className="public-header-nav">
          <a href="#overview" className="nav-link-item">Overview</a>
          <a href="#capabilities" className="nav-link-item">Capabilities</a>
          <a href="#documents" className="nav-link-item">Gazette Library</a>
          <a href="#standards" className="nav-link-item">Popular Standards</a>
        </nav>

        <div className="public-header-actions">
          {currentUser ? (
            <div className="header-logged-row">
              <button className="home-primary-btn" onClick={() => onEnterApp('chat')}>
                <span>Enter AI Workspace</span>
                <ArrowRight size={15} />
              </button>
              <button className="home-ghost-btn" onClick={onLogout} title="Sign Out">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="header-auth-buttons">
              <button 
                type="button"
                className="header-demo-btn" 
                onClick={() => onQuickDemo ? onQuickDemo('manufacturer') : onGoToAuth('login')}
                title="Instant 1-Click Access for Hackathon Evaluators"
              >
                <Sparkles size={13} color="#16A34A" />
                <span>⚡ 1-Click Demo Access</span>
              </button>

              <button 
                type="button"
                className="header-signin-btn" 
                onClick={() => onGoToAuth('login')}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>

              <button 
                type="button"
                className="header-register-btn" 
                onClick={() => onGoToAuth('register')}
              >
                <span>Register</span>
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 3. Hero Section (Original Clean Light Design) */}
      <section id="overview" className="home-hero-section">
        <div className="home-hero-content">
          <div className="home-eyebrow-pill">
            <span className="live-dot-green"></span>
            <span>National Standards Regulatory Gateway · Grounded in BIS Act 2016</span>
          </div>

          <h1 className="home-hero-headline">
            Bureau of Indian Standards,<br />
            <span className="title-gradient">Demystified with AI Confidence.</span>
          </h1>

          <p className="home-hero-sub">
            The evidence-first compliance intelligence platform for Indian manufacturers, MSMEs, jewellers, and accredited testing laboratories. 
            Trace every certification step, testing clause, and fee concession directly to authentic Gazette of India notifications.
          </p>

          <div className="home-cta-row">
            {currentUser ? (
              <button className="home-primary-btn" onClick={() => onEnterApp('chat')}>
                <Sparkles size={17} />
                <span>Launch AI Copilot Workspace</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <>
                <button className="home-primary-btn" onClick={() => onGoToAuth('register')}>
                  <UserCheck size={17} />
                  <span>Create Account (Register)</span>
                  <ArrowRight size={16} />
                </button>
                <button className="home-secondary-btn" onClick={() => onGoToAuth('login')}>
                  <LogIn size={17} />
                  <span>Sign In to Portal</span>
                </button>
                <button 
                  className="home-demo-outline-btn" 
                  onClick={() => onQuickDemo ? onQuickDemo('manufacturer') : onEnterApp('chat')}
                >
                  <Sparkles size={16} color="#16A34A" />
                  <span>⚡ 1-Click Hackathon Demo</span>
                </button>
              </>
            )}
          </div>

          {/* Quick Standards Search */}
          <div id="standards" className="home-search-wrapper">
            <form onSubmit={handleSearchSubmit} className="home-search-box">
              <Search size={18} color="#3858F9" />
              <input 
                type="text" 
                placeholder="Search an Indian Standard (e.g. IS 456, IS 302), product, clause or fee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="home-search-btn">
                <span>Analyze with AI</span>
                <ArrowRight size={15} />
              </button>
            </form>

            <div className="home-quick-tags">
              <span className="home-quick-tag-label">Popular Standards:</span>
              {quickSearchTags.map((tag, idx) => (
                <button 
                  key={idx} 
                  className="home-tag-chip"
                  onClick={() => onOpenDocument(tag.id, 18, 'Clause 7.2')}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Metrics Counter */}
      <section className="home-metrics-section">
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-number">21,000+</span>
            <span className="metric-label">Indian Standards Cataloged</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-number">30 Days</span>
            <span className="metric-label">Fast-Track Simplified Licensing</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-number">50% Off</span>
            <span className="metric-label">Fee Concession for Startups & Women</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-number">100%</span>
            <span className="metric-label">Evidence-Grounded Gazette Citations</span>
          </div>
        </div>
      </section>

      {/* 5. Core Operational Pillars */}
      <section id="capabilities" className="home-features-section">
        <div className="section-header-center">
          <div className="eyebrow-badge">
            <Award size={13} />
            COMPLIANCE CAPABILITIES
          </div>
          <h2 className="section-title-large">Engineered for Indian Industry & MSMEs</h2>
          <p className="section-subtitle-center">
            From factory quality audits to statutory hallmarking, BISathi bridges the gap between legal regulations and operational execution.
          </p>
        </div>

        <div className="features-grid">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="feature-card">
                <div className="feature-card-top">
                  <div className="feature-icon-box">
                    <Icon size={22} />
                  </div>
                  <span className="status-pill status-pill-green">{feat.badge}</span>
                </div>
                <h3 className="feature-title">{feat.title}</h3>
                <span className="feature-sub">{feat.subtitle}</span>
                <p className="feature-desc">{feat.desc}</p>
                <button className="feature-action-btn" onClick={feat.action}>
                  <span>{feat.actionText}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Ingested Gazette Documents Showcase */}
      <section id="documents" className="home-documents-showcase">
        <div className="section-header-row">
          <div>
            <div className="eyebrow-badge">
              <ShieldCheck size={13} />
              AUTHENTIC SOURCE REPOSITORY
            </div>
            <h2 className="section-title-large">Official Ingested Gazette Documents</h2>
            <p className="section-subtitle">Direct statutory publications from the Ministry of Consumer Affairs, Food & Public Distribution.</p>
          </div>
          <button 
            className="home-secondary-btn" 
            onClick={() => currentUser ? onEnterApp('documents') : onOpenDocument('bis-act-2016', 1)}
          >
            <span>View All Documents ({MOCK_DOCUMENTS.length})</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="documents-preview-grid">
          {MOCK_DOCUMENTS.slice(0, 4).map((doc) => (
            <div key={doc.id} className="preview-doc-card" onClick={() => onOpenDocument(doc.id, doc.defaultPage, doc.defaultClause)}>
              <div className="preview-doc-header">
                <span className="status-pill status-pill-gray">{doc.tag}</span>
                <span className="doc-pages-badge">{doc.pageCount} Pages</span>
              </div>
              <h4 className="preview-doc-title">{doc.title}</h4>
              <p className="preview-doc-desc">{doc.subtitle || doc.description}</p>
              <div className="preview-doc-footer">
                <span className="preview-default-clause">Default: {doc.defaultClause}</span>
                <span className="action-link">Inspect in Split Viewer &gt;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Pre-Footer Call to Action */}
      <section className="home-cta-banner">
        <div className="cta-banner-content">
          <h2 className="cta-banner-title">Accelerate Your Bureau of Indian Standards Journey Today</h2>
          <p className="cta-banner-sub">
            Identify applicable standards, compute official MSME fee concessions, and verify every step against authorized Indian Gazette notifications.
          </p>
          <div className="cta-banner-buttons">
            <button className="home-primary-btn" onClick={() => onGoToAuth('register')}>
              <CheckCircle2 size={18} />
              <span>Register / Create Account</span>
              <ArrowRight size={16} />
            </button>
            <button className="home-banner-outline-btn" onClick={() => onGoToAuth('login')}>
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
            <button 
              className="home-banner-outline-btn" 
              onClick={() => onQuickDemo ? onQuickDemo('manufacturer') : onEnterApp('chat')}
              style={{ borderColor: '#22C55E', color: '#22C55E' }}
            >
              <Sparkles size={16} />
              <span>⚡ 1-Click Demo Login</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. Public Footer */}
      <footer className="public-portal-footer">
        <div className="footer-content-row">
          <div>
            <div className="footer-brand-title">BISathi · National Regulatory AI Gateway</div>
            <p className="footer-brand-sub">
              Empowering Indian Industry, MSMEs, Jewellers, and Citizens through Evidence-Grounded Artificial Intelligence.
            </p>
          </div>
          <div className="footer-links-group">
            <div className="footer-link-col">
              <span className="col-heading">Portal Flow</span>
              <button onClick={() => onGoToAuth('login')}>1. Sign In</button>
              <button onClick={() => onGoToAuth('register')}>2. Register</button>
              <button onClick={() => onEnterApp('chat')}>3. AI Assistant</button>
            </div>
            <div className="footer-link-col">
              <span className="col-heading">Statutory References</span>
              <button onClick={() => onOpenDocument('bis-act-2016', 1)}>BIS Act 2016</button>
              <button onClick={() => onOpenDocument('bis-rules-2018', 1)}>BIS Rules 2018</button>
              <button onClick={() => onOpenDocument('bis-ca-regulations-2018', 1)}>CA Reg. 2018</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom-bar">
          <span>© 2026 Bureau of Indian Standards Knowledge Gateway. Compliant with Gazette of India notifications.</span>
          <span>Zero-Hallucination Policy · 100% Verified Citations</span>
        </div>
      </footer>
    </div>
  );
}
