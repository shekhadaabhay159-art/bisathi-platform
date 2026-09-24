import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Phone,
  Briefcase
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register Form State (Basic Information + Registration Details ONLY)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('manufacturer'); // manufacturer | jeweller | lab | consumer
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail) return;

    // Build user session
    const user = {
      name: loginEmail.split('@')[0] ? (loginEmail.split('@')[0].charAt(0).toUpperCase() + loginEmail.split('@')[0].slice(1)) : 'Member',
      email: loginEmail,
      organization: 'Verified Organization',
      role: 'manufacturer',
      initials: (loginEmail[0] || 'U').toUpperCase()
    };
    onLogin(user);
    onClose();
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
    onLogin(user);
    onClose();
  };

  // Quick Demo Profiles for instant testing
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
    onLogin(demoUser);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="auth-modal-header">
          <div className="auth-modal-brand">
            <div className="auth-logo-badge" style={{ background: '#132231', padding: '4px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/images/branding/bisathi-icon-transparent.png" alt="BISathi" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
            </div>
            <div>
              <h3 className="auth-modal-title">BISathi Portal Access</h3>
              <p className="auth-modal-sub">National Standards Intelligence & Compliance Hub</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs">
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

        {/* Quick Demo Credentials Banner */}
        <div className="auth-demo-banner">
          <div className="auth-demo-header">
            <Sparkles size={13} color="#3858F9" />
            <span>Fast Hackathon Demo Login:</span>
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
              ⚡ Guest
            </button>
          </div>
        </div>

        {/* Form Body */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="auth-field">
              <label>Email or Authorized Registered ID</label>
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
              <label>Password</label>
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
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked /> Remember this device
              </label>
              <button 
                type="button"
                onClick={() => handleQuickDemo('manufacturer')}
                style={{ background: 'none', border: 'none', fontSize: '12px', color: '#3858F9', fontWeight: 600, cursor: 'pointer' }}
              >
                1-Click Demo Login
              </button>
            </div>

            <button type="submit" className="auth-submit-btn">
              <span>Sign In to BISathi Workspace</span>
              <ArrowRight size={16} />
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
            <div className="auth-group-label" style={{ marginTop: '4px' }}>
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
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              <span>Complete Registration & Enter Portal</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="auth-modal-footer">
          <ShieldCheck size={14} color="#10B981" />
          <span>Statutory Data Privacy · Grounded in official BIS Gazette Guidelines</span>
        </div>
      </div>
    </div>
  );
}
