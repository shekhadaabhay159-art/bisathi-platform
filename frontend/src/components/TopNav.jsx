import React, { useState } from 'react';
import { Globe, ChevronDown, User, LogOut, ShieldCheck, LogIn, Home } from 'lucide-react';

export default function TopNav({ 
  activeTab, 
  onNavigate, 
  onOpenHelp, 
  currentUser, 
  onOpenAuth, 
  onLogout,
  onGoToHome
}) {
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  const tabLabels = {
    chat: 'AI Assistant',
    documents: 'Document Library',
    standards: 'Standards Directory',
    certification: 'Certification Schemes',
    laboratories: 'Testing Labs',
    journey: 'My BIS Journey'
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' }
  ];

  return (
    <header className="top-nav">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <button 
          className="breadcrumb-root-btn"
          onClick={onGoToHome}
          title="Return to Main Home Portal"
        >
          <Home size={14} />
          <span>Public Portal</span>
        </button>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-current">{tabLabels[activeTab] || 'AI Assistant'}</span>
      </div>

      {/* Action buttons */}
      <div className="top-nav-actions">
        {/* Language selector */}
        <div style={{ position: 'relative' }}>
          <button 
            className="lang-dropdown-btn"
            onClick={() => setLangOpen(!langOpen)}
          >
            <Globe size={15} color="#475569" />
            <span>{currentLang}</span>
            <ChevronDown size={14} color="#64748B" />
          </button>

          {langOpen && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              padding: '6px 0',
              zIndex: 30,
              minWidth: '150px'
            }}>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setCurrentLang(l.label.split(' ')[0]);
                    setLangOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 14px',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: '#0F172A',
                    backgroundColor: currentLang === l.label.split(' ')[0] ? '#F1F5F9' : 'transparent',
                    fontWeight: currentLang === l.label.split(' ')[0] ? 600 : 400
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Auth Section */}
        {currentUser ? (
          <div style={{ position: 'relative' }}>
            <button 
              className="user-profile-pill"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="user-pill-avatar">
                {currentUser.initials || 'U'}
              </div>
              <span className="user-pill-name">{currentUser.name}</span>
              <ChevronDown size={13} color="#64748B" />
            </button>

            {userMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '115%',
                right: 0,
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                padding: '8px 0',
                zIndex: 35,
                minWidth: '220px'
              }}>
                <div style={{ padding: '8px 14px 10px 14px', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{currentUser.organization}</div>
                  <div style={{ marginTop: '6px' }}>
                    <span className="status-pill status-pill-green" style={{ fontSize: '10px', padding: '2px 8px' }}>
                      <ShieldCheck size={11} /> {currentUser.role?.toUpperCase() || 'VERIFIED'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onLogout && onLogout();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '9px 14px',
                    textAlign: 'left',
                    fontSize: '12.5px',
                    color: '#DC2626',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            className="top-signin-btn"
            onClick={onOpenAuth}
          >
            <LogIn size={14} />
            <span>Sign In / Register</span>
          </button>
        )}

        {/* Help button */}
        <button 
          className="help-btn"
          onClick={onOpenHelp}
          title="BISathi User Guide & Policy"
        >
          ?
        </button>
      </div>
    </header>
  );
}
