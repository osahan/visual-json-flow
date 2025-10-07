import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';

interface PreviewViewProps {
  value: any;
  errors?: any[];
  onChange?: (value: any) => void;
}

export function PreviewView({ value, errors = [], onChange }: PreviewViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleEdit = useCallback(() => {
    setEditValue(JSON.stringify(value, null, 2));
    setIsEditing(true);
  }, [value]);

  const handleSave = useCallback(() => {
    try {
      const parsedValue = JSON.parse(editValue);
      onChange?.(parsedValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Invalid JSON:', error);
      // You could add a toast notification here
    }
  }, [editValue, onChange]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditValue('');
  }, []);

  const handleEditorChange = useCallback((value: string | undefined) => {
    setEditValue(value || '');
  }, []);

  return (
    <div className="vjf-preview-view">
      <div className="vjf-preview-header">
        <div className="vjf-preview-header-top">
          <h2>Data Editor</h2>
          <p>Edit your data directly in the JSON editor below.</p>
        </div>
        
        {errors.length > 0 && (
          <div className="vjf-preview-errors">
            <h3>Validation Errors ({errors.length})</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index} className="vjf-error-item">
                  {error.message || 'Invalid value'}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isEditing ? (
          <div className="vjf-preview-actions">
            <button 
              className="vjf-action-button vjf-primary"
              onClick={handleEdit}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit Data
            </button>
          </div>
        ) : (
          <div className="vjf-preview-actions">
            <button 
              className="vjf-action-button vjf-success"
              onClick={handleSave}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Save Changes
            </button>
            <button 
              className="vjf-action-button vjf-secondary"
              onClick={handleCancel}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cancel
            </button>
          </div>
        )}
      </div>
      
      <div className="vjf-preview-content">
        {isEditing ? (
          <Editor
            height="100%"
            defaultLanguage="json"
            value={editValue}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              theme: 'vs-light',
              wordWrap: 'on',
              folding: true,
              showFoldingControls: 'always',
            }}
          />
        ) : (
          <Editor
            height="100%"
            defaultLanguage="json"
            value={JSON.stringify(value, null, 2)}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              theme: 'vs-light',
              wordWrap: 'on',
              folding: true,
              showFoldingControls: 'always',
            }}
          />
        )}
      </div>
    </div>
  );
}
