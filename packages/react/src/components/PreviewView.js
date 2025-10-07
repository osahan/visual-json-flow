import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
export function PreviewView({ value, errors = [], onChange }) {
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
        }
        catch (error) {
            console.error('Invalid JSON:', error);
            // You could add a toast notification here
        }
    }, [editValue, onChange]);
    const handleCancel = useCallback(() => {
        setIsEditing(false);
        setEditValue('');
    }, []);
    const handleEditorChange = useCallback((value) => {
        setEditValue(value || '');
    }, []);
    return (_jsxs("div", { className: "vjf-preview-view", children: [_jsxs("div", { className: "vjf-preview-header", children: [_jsxs("div", { className: "vjf-preview-header-top", children: [_jsx("h2", { children: "Data Editor" }), _jsx("p", { children: "Edit your data directly in the JSON editor below." })] }), errors.length > 0 && (_jsxs("div", { className: "vjf-preview-errors", children: [_jsxs("h3", { children: ["Validation Errors (", errors.length, ")"] }), _jsx("ul", { children: errors.map((error, index) => (_jsx("li", { className: "vjf-error-item", children: error.message || 'Invalid value' }, index))) })] })), !isEditing ? (_jsx("div", { className: "vjf-preview-actions", children: _jsxs("button", { className: "vjf-action-button vjf-primary", onClick: handleEdit, children: [_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })] }), "Edit Data"] }) })) : (_jsxs("div", { className: "vjf-preview-actions", children: [_jsxs("button", { className: "vjf-action-button vjf-success", onClick: handleSave, children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M20 6L9 17L4 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), "Save Changes"] }), _jsxs("button", { className: "vjf-action-button vjf-secondary", onClick: handleCancel, children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), "Cancel"] })] }))] }), _jsx("div", { className: "vjf-preview-content", children: isEditing ? (_jsx(Editor, { height: "100%", defaultLanguage: "json", value: editValue, onChange: handleEditorChange, options: {
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
                    } })) : (_jsx(Editor, { height: "100%", defaultLanguage: "json", value: JSON.stringify(value, null, 2), options: {
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
                    } })) })] }));
}
