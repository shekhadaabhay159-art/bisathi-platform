import React from 'react';
import { 
  Home,
  MessageSquare, 
  BookOpen, 
  Library, 
  Building2, 
  FlaskConical, 
  CheckCircle2, 
  ShieldCheck, 
  LogIn,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  onGoToHome, 
  onOpenAuth 
}) {
  const navItems = [
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare, hasDot: true },
    { id: 'documents', label: 'Document Library', icon: Library },
    { id: 'standards', label: 'Standards Directory', icon: BookOpen },
    { id: 'certification', label: 'Certification Schemes', icon: Building2 },
    { id: 'laboratories', label: 'Testing Labs', icon: FlaskConical },
    { id: 'journey', label: 'My BIS Journey', icon: CheckCircle2 },
  ];

  return (
    <aside className="sidebar">
      {/* Return to Public Home Portal Button */}
      <div className="sidebar-home-portal-bar">
        <button className="sidebar-home-portal-btn" onClick={onGoToHome} title="Return to Main Home Portal">
          <ArrowLeft size={14} />
          <span>Public Home Portal</span>
        </button>
      </div>

      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img 
            src="/images/branding/favicon-64.png" 
            alt="BISathi Logo" 
            style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'contain' }}
          />
        </div>
        <div className="sidebar-title-group">
          <span className="sidebar-title">BISathi</span>
          <span className="sidebar-tagline">ASK · VERIFY · ACT</span>
        </div>
      </div>

      {/* Nav Section */}
      <div className="sidebar-nav-section">
        <div className="sidebar-section-label">WORKSPACE MODULES</div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <Icon size={17} strokeWidth={isActive ? 2.3 : 1.9} />
                  <span>{item.label}</span>
                </div>
                {item.hasDot && <div className="online-dot" title="Grounded Assistant Ready"></div>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Elements */}
      <div className="sidebar-footer">
        {/* Evidence Mode Indicator */}
        <div className="evidence-mode-card">
          <div className="evidence-mode-header">
            <div className="evidence-pulse-dot"></div>
            <span className="evidence-mode-title">Evidence Mode Active</span>
          </div>
          <p className="evidence-mode-desc">
            Answers are strictly grounded in official Gazette of India clauses
          </p>
        </div>

        {/* User Workspace Info */}
        <div 
          className="user-session-card" 
          onClick={!currentUser ? onOpenAuth : undefined} 
          style={{ cursor: !currentUser ? 'pointer' : 'default' }}
        >
          <div className="avatar-badge" style={{ backgroundColor: currentUser ? '#3858F9' : '#EA580C' }}>
            {currentUser?.initials || 'R'}
          </div>
          <div className="user-session-info">
            <span className="user-session-name">
              {currentUser?.name || 'Guest workspace'}
            </span>
            <span className="user-session-type">
              {currentUser?.organization ? currentUser.organization.substring(0, 20) + (currentUser.organization.length > 20 ? '...' : '') : (
                <span style={{ color: '#3858F9', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <LogIn size={11} /> Click to Sign In
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
