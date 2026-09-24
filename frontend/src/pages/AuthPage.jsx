import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Phone,
  Briefcase
} from 'lucide-react';

export default function AuthPage({ initialMode = 'login', onLoginSuccess, onBackToHome }) {
  const [activeTab, setActiveTab] = useState(initialMode); // 'login' | 'register'
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Registration Form State (Basic Information + Registration Details ONLY)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('manufacturer'); // manufacturer | jeweller | lab | consumer
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail) return;

    const user = {
      name: loginEmail.split('@')[0] ? (loginEmail.split('@')[0].charAt(0).toUpperCase() + loginEmail.split('@')[0].slice(1)) : 'Member',
      email: loginEmail,
      organization: 'Verified Organization',
      role: 'manufacturer',
      initials: (loginEmail[0] || 'U').toUpperCase()
    };
    onLoginSuccess(user);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const user = {
      name: name,
      email: email,
      phone: phone,
      organization: organization || 'Industrial Unit',
      role: role,
      initials: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'
    };
    onLoginSuccess(user);
  };

  // Quick 1-Click Demo Profiles for instant Hackathon testing
  const handleQuickDemo = (demoType) => {
    let demoUser;
    if (demoType === 'manufacturer') {
      demoUser = {
        name: 'Abhay Sharma',
        email: 'abhay@sharmasteels.in',
        phone: '+91 98765 43210',
        organization: 'Sharma Precision Steels (Micro Enterprise)',
        role: 'manufacturer',
        initials: 'AS'
      };
    } else if (demoType === 'jeweller') {
      demoUser = {
        name: 'Priya Mehra',
        email: 'priya@mehraornaments.com',
        phone: '+91 98111 22334',
        organization: 'Mehra Heritage Jewellers',
        role: 'jeweller',
        initials: 'PM'
      };
    } else if (demoType === 'lab') {
      demoUser = {
        name: 'Dr. K. Raman',
        email: 'raman@indiantestlab.org',
        phone: '+91 99887 76655',
        organization: 'National Materials Testing Centre',
        role: 'lab',
        initials: 'KR'
      };
    } else {
      demoUser = {
        name: 'Guest Consultant',
        email: 'guest@bisathi.gov.in',
        phone: '+91 91234 56789',
        organization: 'Regulatory Affairs Dept',
        role: 'consumer',
        initials: 'GC'
      };
    }
    onLoginSuccess(demoUser);
  };

  return (
    <div className="auth-page-screen">
      {/* Top Navbar */}
      <header className="auth-page-topbar">
        <button className="auth-back-btn" onClick={onBackToHome}>
          <ArrowLeft size={16} />
          <span>Back to Main Home Portal</span>
        </button>

        <div className="auth-brand-center">
          <div className="sidebar-logo" style={{ width: '34px', height: '34px' }}>
            <img 
              src="/images/branding/favicon-64.png" 
              alt="BISathi Logo" 
              style={{ width: '34px', height: '34px', borderRadius: '8px', objectFit: 'contain' }}
            />
          </div>
          <span className="auth-brand-name">BISathi</span>
          <span className="auth-brand-divider">|</span>
          <span className="auth-brand-desc">Bureau of Indian Standards Regulatory Gateway</span>
        </div>

        <div className="auth-step-pill">
          <span className="step-num">Step 2</span>
          <ChevronRight size={14} color="#94A3B8" />
          <span>Authentication</span>
        </div>
      </header>

      {/* Main Container */}
      <div className="auth-page-body">
        <div className="auth-page-card">
          {/* Card Header */}
          <div className="auth-card-hero">
            <div className="auth-hero-badge">
              <ShieldCheck size={14} color="#3858F9" />
              <span>OFFICIAL REGULATORY ACCESS</span>
            </div>
            <h2 className="auth-card-title">
              {activeTab === 'login' ? 'Sign In to Your Account' : 'Portal Registration'}
            </h2>
            <p className="auth-card-desc">
              {activeTab === 'login' 
                ? 'Enter your registered credentials to access your BIS compliance workspace.' 
                : 'Enter your basic contact details and registration information to get started.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="auth-tabs" style={{ marginBottom: '20px' }}>
            <button 
              type="button"
              className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button 
              type="button"
              className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register (Create Account)
            </button>
          </div>

          {/* Quick 1-Click Demo Banner */}
          <div className="auth-demo-banner">
            <div className="auth-demo-header">
              <Sparkles size={14} color="#3858F9" />
              <span>Hackathon 1-Click Instant Access (No typing needed):</span>
            </div>
            <div className="auth-demo-buttons">
              <button 
                type="button" 
                className="demo-pill-btn" 
                onClick={() => handleQuickDemo('manufacturer')}
              >
                🏭 MSME Manufacturer
              </button>
              <button 
                type="button" 
                className="demo-pill-btn" 
                onClick={() => handleQuickDemo('jeweller')}
              >
                💎 Jeweller (HUID)
              </button>
              <button 
                type="button" 
                className="demo-pill-btn" 
                onClick={() => handleQuickDemo('lab')}
              >
                🔬 Testing Lab
              </button>
              <button 
                type="button" 
                className="demo-pill-btn" 
                onClick={() => handleQuickDemo('guest')}
                style={{ borderColor: '#22C55E', color: '#16A34A', background: '#F0FDF4' }}
              >
                ⚡ Instant Guest Access
              </button>
            </div>
          </div>

          {/* Form */}
          {activeTab === 'login' ? (
            /* ================= SIGN IN FORM ================= */
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="auth-field">
                <label>Email Address or Registered ID</label>
                <div className="auth-input-box">
                  <Mail size={16} color="#94A3B8" />
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. manufacturer@company.in"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>Security Password</label>
                <div className="auth-input-box">
                  <Lock size={16} color="#94A3B8" />
                  <input 
                    type="password" 
                    required
                    placeholder="Enter your security password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-remember-row">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#64748B', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked /> Remember this session
                </label>
                <button 
                  type="button"
                  onClick={() => handleQuickDemo('manufacturer')}
                  style={{ background: 'none', border: 'none', fontSize: '12.5px', color: '#3858F9', fontWeight: 600, cursor: 'pointer' }}
                >
                  Need quick access? Use 1-Click Demo
                </button>
              </div>

              <button type="submit" className="auth-submit-btn">
                <span>Sign In & Launch AI Assistant</span>
                <ArrowRight size={17} />
              </button>
            </form>
          ) : (
            /* ================= REGISTRATION FORM (BASIC INFO + REGISTRATION DETAILS ONLY) ================= */
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              {/* 1. Basic Information Section */}
              <div className="auth-group-label">
                <span>BASIC INFORMATION</span>
              </div>

              <div className="auth-field">
                <label>Full Name *</label>
                <div className="auth-input-box">
                  <User size={16} color="#94A3B8" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Abhay Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-row-2">
                <div className="auth-field">
                  <label>Email Address *</label>
                  <div className="auth-input-box">
                    <Mail size={16} color="#94A3B8" />
                    <input 
                      type="email" 
                      required
                      placeholder="name@company.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label>Mobile Number *</label>
                  <div className="auth-input-box">
                    <Phone size={16} color="#94A3B8" />
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Registration Details Section */}
              <div className="auth-group-label" style={{ marginTop: '6px' }}>
                <span>REGISTRATION DETAILS</span>
              </div>

              <div className="auth-row-2">
                <div className="auth-field">
                  <label>Organization / Business Name *</label>
                  <div className="auth-input-box">
                    <Building2 size={16} color="#94A3B8" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Precision Steels Ltd"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label>Registration Category *</label>
                  <div className="auth-input-box">
                    <Briefcase size={16} color="#94A3B8" />
                    <select 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                      className="auth-dropdown-select"
                    >
                      <option value="manufacturer">Manufacturer / MSME</option>
                      <option value="jeweller">Jeweller / AHC (Hallmarking)</option>
                      <option value="lab">Testing Laboratory</option>
                      <option value="consumer">Citizen / Consultant</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="auth-field">
                <label>Set Security Password *</label>
                <div className="auth-input-box">
                  <Lock size={16} color="#94A3B8" />
                  <input 
                    type="password" 
                    required
                    placeholder="Enter minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn">
                <span>Complete Registration & Enter Workspace</span>
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          {/* Card Footer */}
          <div className="auth-modal-footer">
            <ShieldCheck size={14} color="#10B981" />
            <span>Statutory Data Privacy · Grounded in BIS Act 2016 Guidelines</span>
          </div>
        </div>
      </div>
    </div>
  );
}
