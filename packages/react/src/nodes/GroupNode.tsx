import { Handle, Position } from "reactflow";
import type { UiNode } from "@vjf/core";
export default function GroupNode({ data }: { data: { node: UiNode; errors: string[] } }) {
  if (data.node.type !== "group") return null; const n = data.node;
  return (
    <div className={"vjf-node" + (data.errors.length ? " vjf-error": "")}>
      <div className="vjf-title">{n.title ?? n.path}</div>
      {n.description && <div style={{fontSize:12,opacity:.7}}>{n.description}</div>}
      {data.errors.length > 0 && <div className="vjf-badge" style={{marginTop:6}}>{data.errors[0]}</div>}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
