import { Handle, Position } from "reactflow";
import type { UiNode } from "@vjf/core";
export default function ArrayLaneNode({ data }: { data: { node: UiNode; value: any[]; onChange:(v:any)=>void; errors: string[] }}) {
  if (data.node.type !== "array") return null;
  const n = data.node;
  const items = Array.isArray(data.value) ? data.value : [];
  const addItem = () => data.onChange([...(items ?? []), null]);
  const del = (i: number) => data.onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className={"vjf-node vjf-lane" + (data.errors.length ? " vjf-error": "")}>
      <div className="vjf-title">{n.title ?? n.path}</div>
      <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
        {items.map((_, i) => (
          <div key={i} style={{border:"1px dashed #ccc", borderRadius:6, padding:6}}>
            <div style={{fontSize:12}}>Item {i+1}</div>
            <button onClick={() => del(i)}>Delete</button>
          </div>
        ))}
        <button onClick={addItem}>+ Add item</button>
      </div>
      {data.errors.length > 0 && <div className="vjf-badge" style={{marginTop:6}}>{data.errors[0]}</div>}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
