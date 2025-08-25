import { Handle, Position } from "reactflow";
import type { UiNode } from "@vjf/core";
export default function ArrayLaneNode({ data }: { data: { node: UiNode; value: any[]; onChange:(v:any)=>void; errors: string[] }}) {
  if (data.node.type !== "array") return null;
  const n = data.node;
  const items = Array.isArray(data.value) ? data.value : [];
  const addItem = () => data.onChange([...(items ?? []), null]);
  const del = (i: number) => data.onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className={`vjf-node vjf-lane ${data.errors.length ? "vjf-error" : ""}`}>
      <div className="vjf-title">{n.title ?? n.path}</div>
      <div className="array-items">
        {items.map((_, i) => (
          <div key={i} className="array-item">
            <div className="array-item-label">Item {i+1}</div>
            <button className="array-item-delete" onClick={() => del(i)}>
              Delete
            </button>
          </div>
        ))}
        <button className="array-add-button" onClick={addItem}>
          + Add item
        </button>
      </div>
      {data.errors.length > 0 && <div className="vjf-badge">{data.errors[0]}</div>}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
