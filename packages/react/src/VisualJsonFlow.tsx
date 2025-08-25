import React, { useMemo, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import "./styles.css";
import { compileSchemaToAst, createValidator, UiAst, UiNode } from "@vjf/core";
import ScalarNode from "./nodes/ScalarNode";
import GroupNode from "./nodes/GroupNode";
import ArrayLaneNode from "./nodes/ArrayLaneNode";
import ChoiceNode from "./nodes/ChoiceNode";
import { Header } from "./components/Header";
import equal from "fast-deep-equal";

type Props = { schema: any; value: any; onChange: (v: any) => void; onValidate?: (errors: any[]) => void; };
const nodeTypes = { scalar: ScalarNode, group: GroupNode, array: ArrayLaneNode, choice: ChoiceNode };

export function VisualJsonFlow({ schema, value, onChange, onValidate }: Props) {
  const ast = useMemo<UiAst>(() => compileSchemaToAst(schema), [schema]);
  const validator = useMemo(() => createValidator(schema), [schema]);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, number>>({});

  const { nodes, edges } = useMemo(() => {
    const rfNodes: Node[] = []; const rfEdges: Edge[] = []; const errorsByPath: Record<string,string[]> = {};
    const { errors } = validator.validate(value);
    errors?.forEach(e => { const p = (e.instancePath || "/") as string; (errorsByPath[p] ||= []).push(e.message || "Invalid"); });

    function bindData(n: UiNode, errors: string[]) {
      const getValueAtPath = (path: string) => path.split("/").filter(Boolean).reduce((acc, k) => (acc ? (acc as any)[k] : undefined), value);
      const setValueAtPath = (path: string, v: any) => {
        const keys = path.split("/").filter(Boolean);
        const next = Array.isArray(value) || typeof value === "object" ? structuredClone(value) : {};
        let cur: any = next; for (let i = 0; i < keys.length - 1; i++) { cur[keys[i]] = cur[keys[i]] ?? {}; cur = cur[keys[i]]; }
        cur[keys[keys.length - 1]] = v; if (!equal(next, value)) onChange(next);
      };
      if (n.type === "scalar") return { node: n, path: n.path, value: getValueAtPath(n.path), onChange: (v:any) => setValueAtPath(n.path, v), errors };
      if (n.type === "array")  return { node: n, path: n.path, value: getValueAtPath(n.path) ?? [], onChange: (v:any)=> setValueAtPath(n.path, v), errors };
      if (n.type === "choice") return { node: n, selectedIndex: selectedChoices[n.path] ?? 0, onSelect: (i:number)=> setSelectedChoices(s=>({...s,[n.path]:i})), errors };
      return { node: n, errors };
    }

    Object.values(ast.nodes).forEach((n, idx) => {
      const errors = errorsByPath[n.path] ?? [];
      rfNodes.push({ 
        id: n.id, 
        type: n.type, 
        position: { x: n.type === "group" ? 0 : 260, y: idx * 110 }, 
        data: bindData(n, errors),
        draggable: true
      });
      if (n.type === "group") n.children.forEach(cid => rfEdges.push({ id: `${n.id}-${cid}`, source: n.id, target: cid }));
      if (n.type === "array") rfEdges.push({ id: `${n.id}-${(n as any).item}`, source: n.id, target: (n as any).item });
      if (n.type === "choice") (n as any).options.forEach((o: any, i: number) => rfEdges.push({ id: `${n.id}-${o.node}-${i}`, source: n.id, target: o.node }));
    });

    onValidate?.(errors ?? []);
    return { nodes: rfNodes, edges: rfEdges };
  }, [ast, value, selectedChoices, validator]);

  return (
    <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
      <Header 
        projectName="Visual JSON Flow" 
        status="active"
        onStatusChange={(status) => console.log('Status changed:', status)}
      />
      <div style={{flex: 1, position: "relative"}}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          defaultEdgeOptions={{ type: 'smoothstep' }}
        >
          <MiniMap /><Controls /><Background />
        </ReactFlow>
      </div>
    </div>
  );
}
export default VisualJsonFlow;
