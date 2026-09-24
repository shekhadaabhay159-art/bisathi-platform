import React from 'react';
import { Bot, ArrowRight, ShieldCheck, FileText, ExternalLink } from 'lucide-react';
import SourceCitation from './SourceCitation';

// Simple markdown-to-JSX renderer (no external lib needed)
function renderMarkdown(text) {
  if (!text) return null;

  // Split into lines and process
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H3 heading: ### text
    if (line.startsWith('### ')) {
      elements.push(
        <div key={i} style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '14px', marginBottom: '4px', letterSpacing: '-0.1px' }}>
          {renderInline(line.slice(4))}
        </div>
      );
      i++;
      continue;
    }

    // H2 heading: ## text
    if (line.startsWith('## ')) {
      elements.push(
        <div key={i} style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginTop: '16px', marginBottom: '6px' }}>
          {renderInline(line.slice(3))}
        </div>
      );
      i++;
      continue;
    }

    // H1 heading: # text
    if (line.startsWith('# ')) {
      elements.push(
        <div key={i} style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginTop: '16px', marginBottom: '8px' }}>
          {renderInline(line.slice(2))}
        </div>
      );
      i++;
      continue;
    }

    // Horizontal rule ---
    if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
      elements.push(<div key={i} style={{ borderTop: '1px solid #E2E8F0', margin: '10px 0' }} />);
      i++;
      continue;
    }

    // Bullet list: * text or - text
    if (line.match(/^[\*\-] /) || line.match(/^\d+\. /)) {
      const listItems = [];
      const isOrdered = line.match(/^\d+\. /);
      while (i < lines.length && (lines[i].match(/^[\*\-] /) || lines[i].match(/^\d+\. /) || lines[i].match(/^   [\*\-] /) || lines[i].match(/^\s{3,}/))) {
        const currLine = lines[i];
        const isNested = currLine.match(/^\s{3,}/);
        const text = currLine.replace(/^[\s]*[\*\-\d\.]+\s/, '');
        listItems.push(
          <li key={i} style={{
            fontSize: '13px',
            color: '#334155',
            lineHeight: 1.6,
            marginBottom: '3px',
            marginLeft: isNested ? '16px' : '0',
            listStyleType: isNested ? 'circle' : (isOrdered ? 'decimal' : 'disc'),
          }}>
            {renderInline(text)}
          </li>
        );
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} style={{ paddingLeft: '20px', margin: '6px 0' }}>
          {listItems}
        </ul>
      );
      continue;
    }

    // Empty line → spacing
    if (line.trim() === '') {
      elements.push(<div key={i} style={{ height: '6px' }} />);
      i++;
      continue;
    }

    // Normal paragraph
    elements.push(
      <p key={i} style={{ fontSize: '13.5px', color: '#0F172A', lineHeight: 1.65, margin: '4px 0' }}>
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

// Inline markdown: **bold**, *italic*, `code`, [link](url)
function renderInline(text) {
  if (!text) return null;

  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // **bold**
    const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*/s);
    // *italic*
    const italicMatch = remaining.match(/^(.*?)\*(.+?)\*/s);
    // `code`
    const codeMatch = remaining.match(/^(.*?)`(.+?)`/s);
    // [link](url)
    const linkMatch = remaining.match(/^(.*?)\[(.+?)\]\((.+?)\)/s);

    const matches = [
      boldMatch && { idx: boldMatch[1].length, type: 'bold', match: boldMatch },
      italicMatch && { idx: italicMatch[1].length, type: 'italic', match: italicMatch },
      codeMatch && { idx: codeMatch[1].length, type: 'code', match: codeMatch },
      linkMatch && { idx: linkMatch[1].length, type: 'link', match: linkMatch },
    ].filter(Boolean).sort((a, b) => a.idx - b.idx);

    if (matches.length === 0) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    const first = matches[0];
    const { type, match } = first;

    // Text before the match
    if (match[1]) parts.push(<span key={key++}>{match[1]}</span>);

    if (type === 'bold') {
      parts.push(<strong key={key++} style={{ fontWeight: 700, color: '#0F172A' }}>{match[2]}</strong>);
      remaining = remaining.slice(match[1].length + match[2].length + 4);
    } else if (type === 'italic') {
      parts.push(<em key={key++} style={{ fontStyle: 'italic' }}>{match[2]}</em>);
      remaining = remaining.slice(match[1].length + match[2].length + 2);
    } else if (type === 'code') {
      parts.push(
        <code key={key++} style={{ backgroundColor: '#F1F5F9', color: '#1E40AF', padding: '1px 5px', borderRadius: '4px', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>
          {match[2]}
        </code>
      );
      remaining = remaining.slice(match[1].length + match[2].length + 2);
    } else if (type === 'link') {
      parts.push(
        <a key={key++} href={match[3]} target="_blank" rel="noopener noreferrer"
          style={{ color: '#3858F9', textDecoration: 'underline', fontWeight: 500 }}>
          {match[2]}
        </a>
      );
      remaining = remaining.slice(match[1].length + match[2].length + match[3].length + 4);
    }
  }

  return parts.length > 0 ? parts : text;
}

export default function ChatMessage({ message, onOpenDocument }) {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '12px 0'
      }}>
        <div style={{
          backgroundColor: '#0B192C',
          color: '#FFFFFF',
          padding: '12px 18px',
          borderRadius: '16px 16px 4px 16px',
          maxWidth: '80%',
          fontSize: '14px',
          lineHeight: 1.5,
          boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
        }}>
          {message.text}
        </div>
      </div>
    );
  }

  // Welcome message
  if (message.isWelcome) {
    return (
      <div className="bot-welcome-card">
        <div className="bot-avatar-box">
          <Bot size={20} />
        </div>
        <div className="bot-content-col">
          <div className="bot-sender-name">BISATHI AI</div>
          <div className="bot-sender-text">
            {message.text}
          </div>
        </div>
      </div>
    );
  }

  const answerText = message.answer || message.text || '';
  const hasMarkdown = /(\*\*|###|##|---|\* |- |\d\. )/.test(answerText);

  // Structured AI Answer response format
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', margin: '14px 0' }}>
      <div className="bot-avatar-box" style={{ marginTop: '4px' }}>
        <Bot size={20} />
      </div>

      <div className="ai-response-card" style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span className="bot-sender-name">BISATHI AI</span>
          <span className="status-pill status-pill-green">
            <ShieldCheck size={13} />
            Verified BIS Evidence
          </span>
        </div>

        {/* 1. Answer — rendered as markdown if it contains markdown syntax */}
        <div style={{ fontSize: '13.5px', color: '#0F172A', lineHeight: 1.6, marginBottom: '14px' }}>
          {hasMarkdown ? renderMarkdown(answerText) : answerText}
        </div>

        {/* 2. Key Points */}
        {message.key_points && message.key_points.length > 0 && (
          <div style={{ marginBottom: '14px' }}>
            <div className="response-section-heading">Key points</div>
            <ul className="response-bullet-list">
              {message.key_points.map((pt, idx) => (
                <li key={idx} className="response-bullet-item">{pt}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. Library Documents — clickable document chips */}
        {message.library_docs && message.library_docs.length > 0 && (
          <div style={{ marginBottom: '14px' }}>
            <div className="response-section-heading">
              <FileText size={12} style={{ marginRight: '4px', display: 'inline' }} />
              Available in Document Library
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {message.library_docs.map((doc, idx) => (
                <button
                  key={idx}
                  onClick={() => onOpenDocument && onOpenDocument(doc.document_id, doc.page || 1)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 11px',
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '6px',
                    color: '#1E40AF',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#DBEAFE'; e.currentTarget.style.borderColor = '#93C5FD'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#EFF6FF'; e.currentTarget.style.borderColor = '#BFDBFE'; }}
                  title={`Open ${doc.title} in Document Viewer`}
                >
                  <FileText size={11} />
                  {doc.title}
                  <ExternalLink size={10} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Official BIS Evidence (Sources) */}
        {message.sources && message.sources.length > 0 && (
          <div style={{ marginBottom: '14px' }}>
            <div className="response-section-heading">Official BIS evidence</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {message.sources.map((src, idx) => (
                <SourceCitation
                  key={idx}
                  source={src}
                  onOpenDocument={onOpenDocument}
                />
              ))}
            </div>
          </div>
        )}

        {/* 5. Next Step */}
        {message.next_step && (
          <div style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '10px 14px',
            marginTop: '10px'
          }}>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ArrowRight size={13} color="#D97706" />
              Next step
            </div>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.45 }}>
              {message.next_step}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
