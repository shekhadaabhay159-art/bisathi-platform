import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import DocumentViewer from './components/DocumentViewer';
import HelpModal from './components/HelpModal';
import AuthModal from './components/AuthModal';

// Pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AIAssistantPage from './pages/AIAssistantPage';
import DocumentLibraryPage from './pages/DocumentLibraryPage';
import StandardsPage from './pages/StandardsPage';
import CertificationPage from './pages/CertificationPage';
import LaboratoriesPage from './pages/LaboratoriesPage';
import JourneyPage from './pages/JourneyPage';

export default function App() {
  // Main Application Navigation Flow:
  // 1. 'home' -> Main Home Landing Page
  // 2. 'auth' -> Dedicated Register / Login Page
  // 3. 'app'  -> AI Chat Interface & Other Dashboard Tools
  const [currentView, setCurrentView] = useState('home'); 
  const [authInitialMode, setAuthInitialMode] = useState('login'); // 'login' | 'register'
  
  // Dashboard Active Module (defaults to 'chat' - AI Chat Interface)
  const [activeTab, setActiveTab] = useState('chat');
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bisathi_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Modal State for in-app sign-in trigger
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleLogin = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('bisathi_user', JSON.stringify(user));
    } catch (e) {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('bisathi_user');
    } catch (e) {}
    setCurrentView('home');
  };

  // Quick Demo Shortcut for 1-Click Hackathon Entry
  const handleQuickDemo = (role = 'manufacturer') => {
    const demoUser = {
      name: role === 'jeweller' ? 'Priya Mehra' : (role === 'lab' ? 'Dr. K. Raman' : 'Abhay Sharma'),
      email: role === 'jeweller' ? 'priya@mehraornaments.com' : (role === 'lab' ? 'raman@indiantestlab.org' : 'abhay@sharmasteels.in'),
      organization: role === 'jeweller' ? 'Mehra Heritage Jewellers' : (role === 'lab' ? 'National Materials Testing Centre' : 'Sharma Precision Steels (MSME)'),
      role: role,
      udyamNumber: 'UDYAM-DL-03-0029141',
      initials: role === 'jeweller' ? 'PM' : (role === 'lab' ? 'KR' : 'AS')
    };
    handleLogin(demoUser);
    setCurrentView('app');
    setActiveTab('chat');
  };
  
  // Signature Document Split-Screen State
  const [documentOpen, setDocumentOpen] = useState(false);
  const [currentDocId, setCurrentDocId] = useState('is-456-2000');
  const [currentPage, setCurrentPage] = useState(18);
  const [targetClause, setTargetClause] = useState('Clause 7.2');
  
  // Ask about this page execution status: 'idle' | 'loading' | 'success'
  const [askStatus, setAskStatus] = useState('idle');
  const chatRef = useRef(null);

  // Help Modal State
  const [helpOpen, setHelpOpen] = useState(false);

  const [initialQuery, setInitialQuery] = useState(null);

  // Open Document in Split View
  const handleOpenDocument = (docId, page = null, clause = null) => {
    let targetPage = page;
    let targetClauseName = clause;
    if (!targetPage) {
      if (docId === 'is-456-2000') { targetPage = 18; targetClauseName = 'Clause 7.2'; }
      else if (docId === 'bis-act-2016') { targetPage = 9; targetClauseName = 'Section 16'; }
      else if (docId === 'bis-rules-2018') { targetPage = 49; targetClauseName = 'Rule 37'; }
      else if (docId === 'bis-marking-fee-notification-2021') { targetPage = 3; targetClauseName = 'Concessions'; }
      else if (docId === 'bis-hallmarking-amendment-2022') { targetPage = 3; targetClauseName = 'Schedule IV'; }
      else if (docId === 'bis-hallmarking-regulations-2018') { targetPage = 53; targetClauseName = 'Regulation 5'; }
      else if (docId === 'bis-ca-regulations-2018') { targetPage = 243; targetClauseName = 'Scheme-I'; }
      else { targetPage = 1; }
    }
    setCurrentDocId(docId);
    setCurrentPage(targetPage);
    setTargetClause(targetClauseName);
    setDocumentOpen(true);
    setCurrentView('app');
    setActiveTab('chat');
  };

  // Close Document Viewer & restore full view
  const handleCloseDocument = () => {
    setDocumentOpen(false);
  };

  // "Ask about this page" button: directly triggers AI analysis on the exact page
  const handleAskAboutPage = async (standardCode, page) => {
    const pageNum = page || currentPage;
    setCurrentPage(pageNum);
    const question = `Explain the content and requirements on Page ${pageNum} of ${standardCode}. What does this page cover?`;
    
    setAskStatus('loading');
    try {
      if (chatRef.current && chatRef.current.sendQuery) {
        await chatRef.current.sendQuery(question, {
          document_id: currentDocId,
          page: pageNum,
          clause: targetClause
        });
      }
      setAskStatus('success');
      setTimeout(() => {
        setAskStatus('idle');
      }, 2500);
    } catch (err) {
      console.error('Error asking about page:', err);
      setAskStatus('idle');
    }
  };

  // Navigation helper for child views
  const handleAskAssistant = (prompt) => {
    setActiveTab('chat');
    if (prompt) {
      setInitialQuery(prompt);
    }
  };

  // ==========================================
  // VIEW 1: MAIN HOME LANDING PAGE
  // ==========================================
  if (currentView === 'home') {
    return (
      <div className="home-root-viewport">
        <HomePage 
          onGoToAuth={(mode) => {
            setAuthInitialMode(mode);
            setCurrentView('auth');
          }}
          onEnterApp={(tab = 'chat', query = null) => {
            setActiveTab(tab);
            setCurrentView('app');
            if (query) {
              setInitialQuery(query);
            }
          }}
          onOpenDocument={(docId, page, clause) => {
            handleOpenDocument(docId, page, clause);
          }}
          currentUser={currentUser}
          onLogout={handleLogout}
          onQuickDemo={handleQuickDemo}
        />
        
        {/* Help Modal */}
        <HelpModal 
          isOpen={helpOpen} 
          onClose={() => setHelpOpen(false)} 
        />
      </div>
    );
  }

  // ==========================================
  // VIEW 2: REGISTER & LOGIN PAGE
  // ==========================================
  if (currentView === 'auth') {
    return (
      <AuthPage 
        initialMode={authInitialMode}
        onLoginSuccess={(user) => {
          handleLogin(user);
          setCurrentView('app');
          setActiveTab('chat'); // Automatically routes to AI Chat Interface
        }}
        onBackToHome={() => setCurrentView('home')}
      />
    );
  }

  // ==========================================
  // VIEW 3: AI CHAT INTERFACE AND OTHER WORKSPACE
  // ==========================================
  return (
    <div className="app-layout">
      {/* Left Dark Navy Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'chat') {
            setDocumentOpen(false);
          }
        }} 
        currentUser={currentUser}
        onGoToHome={() => setCurrentView('home')}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Workspace Area */}
      <div className="main-wrapper">
        {/* Top Breadcrumb & Actions Bar */}
        <TopNav 
          activeTab={activeTab} 
          onNavigate={(tab) => {
            setActiveTab(tab);
            if (tab !== 'chat') setDocumentOpen(false);
          }}
          onOpenHelp={() => setHelpOpen(true)} 
          currentUser={currentUser}
          onOpenAuth={() => setAuthModalOpen(true)}
          onLogout={handleLogout}
          onGoToHome={() => setCurrentView('home')}
        />

        {/* Dynamic Content Viewport */}
        <main className="content-viewport">
          {/* SIGNATURE 40% CHAT + 60% DOCUMENT SPLIT WORKSPACE */}
          {documentOpen ? (
            <div className="split-workspace-container">
              {/* 40% Chat on Left */}
              <AIAssistantPage 
                ref={chatRef}
                isSplitView={true}
                onOpenDocument={handleOpenDocument}
                documentContext={{
                  document_id: currentDocId,
                  page: currentPage,
                  clause: targetClause
                }}
                initialQuery={initialQuery}
                onClearInitialQuery={() => setInitialQuery(null)}
              />

              {/* 60% Document Viewer on Right */}
              <DocumentViewer 
                documentId={currentDocId}
                initialPage={currentPage}
                targetClause={targetClause}
                onClose={handleCloseDocument}
                onPageChange={(p) => setCurrentPage(p)}
                onAskAboutPage={handleAskAboutPage}
                askStatus={askStatus}
              />
            </div>
          ) : (
            /* Normal 100% Full-Screen Views */
            <>
              {activeTab === 'chat' && (
                <AIAssistantPage 
                  isSplitView={false}
                  onOpenDocument={handleOpenDocument}
                  initialQuery={initialQuery}
                  onClearInitialQuery={() => setInitialQuery(null)}
                />
              )}

              {activeTab === 'documents' && (
                <DocumentLibraryPage 
                  onOpenDocument={handleOpenDocument} 
                />
              )}

              {activeTab === 'standards' && (
                <StandardsPage 
                  onOpenDocument={handleOpenDocument} 
                />
              )}

              {activeTab === 'certification' && (
                <CertificationPage 
                  onOpenDocument={handleOpenDocument}
                  onAskAssistant={handleAskAssistant}
                />
              )}

              {activeTab === 'laboratories' && (
                <LaboratoriesPage />
              )}

              {activeTab === 'journey' && (
                <JourneyPage 
                  onOpenDocument={handleOpenDocument}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Help Modal */}
      <HelpModal 
        isOpen={helpOpen} 
        onClose={() => setHelpOpen(false)} 
      />

      {/* Auth Modal (Fallback for quick modal sign-in while inside app) */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  );
}
