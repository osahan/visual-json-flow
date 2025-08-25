import { Handle, Position } from "reactflow";
import type { UiNode } from "@vjf/core";
import { useId, useState } from "react";

export default function ScalarNode({ data }: { data: { node: UiNode; value: any; onChange: (v:any)=>void; errors: string[] } }) {
  const id = useId();
  const [showTooltip, setShowTooltip] = useState(false);
  
  if (data.node.type !== "scalar") return null;
  const n = data.node;
  const err = data.errors.length ? " vjf-error" : "";
  
  const onInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let v: any = (e.target as HTMLInputElement).value;
    if (n.scalar === "number" || n.scalar === "integer") v = v === "" ? null : Number(v);
    data.onChange(v);
  };
  
  const input = n.enum ? (
    <select id={id} value={data.value ?? ""} onChange={onInput}>
      <option value="" disabled>Select…</option>
      {n.enum.map((v) => <option key={String(v)} value={String(v)}>{String(v)}</option>)}
    </select>
  ) : (
    <input id={id} type={n.format === "email" ? "email" : n.format === "uri" ? "url" : "text"} value={data.value ?? ""} onChange={onInput} />
  );
  
  return (
    <div className={`vjf-node ${err}`}>
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
      {input}
      {n.description && <div className="vjf-description">{n.description}</div>}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
