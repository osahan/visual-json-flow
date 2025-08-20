import { Handle, Position } from "reactflow";
import type { UiNode } from "@vjf/core";
export default function ChoiceNode({ data }: { data: { node: UiNode; selectedIndex: number; onSelect:(i:number)=>void; errors: string[] } }) {
  if (data.node.type !== "choice") return null; const n = data.node;
  return (
    <div className={"vjf-node" + (data.errors.length ? " vjf-error": "")}>
      <div className="vjf-title">{n.title ?? n.path}</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {n.options.map((opt, i) => (
          <button key={i} onClick={() => data.onSelect(i)} className={i===data.selectedIndex ? "vjf-badge": ""}>
            {opt.label ?? `Option ${i+1}`}
          </button>
        ))}
      </div>
      {data.errors.length > 0 && <div className="vjf-badge" style={{marginTop:6}}>{data.errors[0]}</div>}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
