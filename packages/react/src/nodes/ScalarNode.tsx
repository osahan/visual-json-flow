import { Handle, Position } from "reactflow";
import type { UiNode } from "@vjf/core";
import { useId } from "react";
export default function ScalarNode({ data }: { data: { node: UiNode; value: any; onChange: (v:any)=>void; errors: string[] } }) {
  const id = useId();
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
    <div className={"vjf-node"+err}>
      <div className="vjf-title">{n.title ?? n.path}</div>
      {input}
      {n.description && <div style={{fontSize:12,opacity:.7,marginTop:4}}>{n.description}</div>}
      {data.errors.length > 0 && <div className="vjf-badge" style={{marginTop:6}}>{data.errors[0]}</div>}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
