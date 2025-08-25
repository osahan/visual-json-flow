import React, { useMemo, useState, useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import "./styles.css";
import { compileSchemaToAst, createValidator, UiAst, UiNode } from "@vjf/core";
import ScalarNode from "./nodes/ScalarNode";
import GroupNode from "./nodes/GroupNode";
import ArrayLaneNode from "./nodes/ArrayLaneNode";
import ChoiceNode from "./nodes/ChoiceNode";
import { Header } from "./components/Header";
import { SchemaView } from "./components/SchemaView";
import { PreviewView } from "./components/PreviewView";
import equal from "fast-deep-equal";

type TabType = 'editor' | 'schema' | 'preview';

type Props = { schema: any; value: any; onChange: (v: any) => void; onValidate?: (errors: any[]) => void; };
const nodeTypes = { scalar: ScalarNode, group: GroupNode, array: ArrayLaneNode, choice: ChoiceNode };

export function VisualJsonFlow({ schema, value, onChange, onValidate }: Props) {
  console.log('VisualJsonFlow component rendering');
  const ast = useMemo<UiAst>(() => compileSchemaToAst(schema), [schema]);
  const validator = useMemo(() => createValidator(schema), [schema]);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<TabType>('editor');
  const [validationErrors, setValidationErrors] = useState<any[]>([]);

  // Debug: Log active tab changes
  React.useEffect(() => {
    console.log('Active tab changed to:', activeTab);
  }, [activeTab]);

  // Create initial nodes and edges
  const initialNodesAndEdges = useMemo(() => {
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
        position: { x: n.type === "group" ? 0 : 260, y: idx * 120 }, 
        data: bindData(n, errors),
        draggable: true,
        style: { 
          width: 250,
          minHeight: 100,
          zIndex: 1
        }
      });
      if (n.type === "group") n.children.forEach(cid => rfEdges.push({ id: `${n.id}-${cid}`, source: n.id, target: cid }));
      if (n.type === "array") rfEdges.push({ id: `${n.id}-${(n as any).item}`, source: n.id, target: (n as any).item });
      if (n.type === "choice") (n as any).options.forEach((o: any, i: number) => rfEdges.push({ id: `${n.id}-${o.node}-${i}`, source: n.id, target: o.node }));
    });

    setValidationErrors(errors ?? []);
    onValidate?.(errors ?? []);
    console.log('Created nodes:', rfNodes);
    console.log('Created edges:', rfEdges);
    return { nodes: rfNodes, edges: rfEdges };
  }, [ast, value, selectedChoices, validator, setValidationErrors]);

  // Use ReactFlow's state management
  const [nodes, setNodes] = useState<Node[]>(initialNodesAndEdges.nodes);
  const [edges, setEdges] = useState<Edge[]>(initialNodesAndEdges.edges);

  // Debug: Log nodes when they change
  React.useEffect(() => {
    console.log('Nodes state updated:', nodes);
  }, [nodes]);

  // Update nodes when data changes
  const updateNodesData = useCallback(() => {
    const errorsByPath: Record<string,string[]> = {};
    const { errors } = validator.validate(value);
    errors?.forEach(e => { const p = (e.instancePath || "/") as string; (errorsByPath[p] ||= []).push(e.message || "Invalid"); });

    setNodes((nds) => 
      nds.map((node) => {
        const astNode = ast.nodes[node.id];
        if (!astNode) return node;
        
        const errors = errorsByPath[astNode.path] ?? [];
        const bindData = (n: UiNode, errors: string[]) => {
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
        };
        
        return {
          ...node,
          data: bindData(astNode, errors)
        };
      })
    );
  }, [ast, value, selectedChoices, validator, setNodes, onChange]);

  // Update nodes when dependencies change
  React.useEffect(() => {
    updateNodesData();
  }, [updateNodesData]);

  // Handle node changes (including drag)
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    console.log('Nodes changed:', changes);
    setNodes((nds) => {
      const updatedNodes = applyNodeChanges(changes, nds);
      console.log('Updated nodes:', updatedNodes);
      return updatedNodes;
    });
  }, [setNodes]);

  // Handle edge changes
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, [setEdges]);

  const renderContent = () => {
    console.log('Rendering content for tab:', activeTab);
    switch (activeTab) {
      case 'schema':
        console.log('Rendering SchemaView');
        return <SchemaView schema={schema} />;
      case 'preview':
        console.log('Rendering PreviewView');
        return <PreviewView value={value} errors={validationErrors} onChange={onChange} />;
      case 'editor':
      default:
        console.log('Rendering Editor (ReactFlow)');
        return (
          <div style={{flex: 1, position: "relative"}}>
            <ReactFlowProvider>
              <ReactFlow 
                nodes={nodes} 
                edges={edges} 
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.1 }}
                defaultEdgeOptions={{ type: 'smoothstep' }}
                nodesDraggable={true}
                nodesConnectable={false}
                elementsSelectable={true}
                panOnDrag={true}
                zoomOnScroll={true}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDragStart={(event, node) => {
                  console.log('Node drag start:', node.id);
                  console.log('Event:', event);
                  console.log('Node:', node);
                }}
                onNodeDrag={(event, node) => {
                  console.log('Node dragging:', node.id);
                  console.log('Position:', node.position);
                }}
                onNodeDragStop={(event, node) => {
                  console.log('Node drag stop:', node.id);
                  console.log('Final position:', node.position);
                }}
                onMouseDown={(event) => console.log('Mouse down on canvas:', event)}
                onConnect={(params) => console.log('Connect:', params)}
              >
                <MiniMap /><Controls /><Background />
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        );
    }
  };

  return (
    <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
      <Header 
        projectName="Visual JSON Flow" 
        status="active"
        activeTab={activeTab}
        onStatusChange={(status) => console.log('Status changed:', status)}
        onTabChange={setActiveTab}
      />
      {renderContent()}
    </div>
  );
}
export default VisualJsonFlow;
