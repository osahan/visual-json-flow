import { Handle, Position } from "reactflow";
import type { UiNode } from "@vjf/core";
import { useState } from "react";

export default function GroupNode({ data }: { data: { node: UiNode; errors: string[] } }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  if (data.node.type !== "group") return null; 
  const n = data.node;
  
  return (
    <div className={`vjf-node ${data.errors.length ? "vjf-error" : ""}`}>
      <div className="vjf-title">
        {n.title ?? n.path}
        {data.errors.length > 0 && (
          <div className="vjf-error-indicator">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="vjf-error-icon"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {showTooltip && (
              <div className="vjf-error-tooltip">
                <div className="vjf-error-tooltip-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Validation Errors</span>
                </div>
                <ul>
                  {data.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      {n.description && <div className="vjf-description">{n.description}</div>}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
