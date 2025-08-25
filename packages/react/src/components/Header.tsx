import React from 'react';

interface HeaderProps {
  projectName?: string;
  status?: 'active' | 'inactive' | 'draft';
  onStatusChange?: (status: string) => void;
}

export function Header({ projectName = "Visual JSON Flow", status = "active", onStatusChange }: HeaderProps) {
  return (
    <header className="vjf-header">
      <div className="vjf-header-left">
        <div className="vjf-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="vjf-logo-text">{projectName}</span>
        </div>
        <div className="vjf-tags">
          <span className="vjf-tag">JSON Schema</span>
          <span className="vjf-tag">Visual Editor</span>
        </div>
      </div>
      
      <div className="vjf-header-center">
        <nav className="vjf-nav">
          <button className="vjf-nav-item vjf-nav-active">Editor</button>
          <button className="vjf-nav-item">Schema</button>
          <button className="vjf-nav-item">Preview</button>
        </nav>
      </div>
      
      <div className="vjf-header-right">
        <div className="vjf-status">
          <button 
            className={`vjf-status-toggle ${status === 'active' ? 'vjf-status-active' : 'vjf-status-inactive'}`}
            onClick={() => onStatusChange?.(status === 'active' ? 'inactive' : 'active')}
          >
            <span className="vjf-status-dot"></span>
            {status === 'active' ? 'Active' : 'Inactive'}
          </button>
        </div>
        
        <div className="vjf-actions">
          <button className="vjf-action-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 13V19A2 2 0 0 1 16 21H8A2 2 0 0 1 6 19V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 7L12 3L8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Share
          </button>
          
          <div className="vjf-saved-indicator">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Saved
          </div>
        </div>
      </div>
    </header>
  );
}
