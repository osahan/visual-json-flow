import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState, useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap, applyNodeChanges, applyEdgeChanges, ReactFlowProvider, ControlButton } from "reactflow";
import "reactflow/dist/style.css";
import "./styles.css";
import { compileSchemaToAst, createValidator } from "@vjf/core";
import ScalarNode from "./nodes/ScalarNode";
import GroupNode from "./nodes/GroupNode";
import ArrayLaneNode from "./nodes/ArrayLaneNode";
import ChoiceNode from "./nodes/ChoiceNode";
import { Header } from "./components/Header";
import { SchemaView } from "./components/SchemaView";
import { PreviewView } from "./components/PreviewView";
import equal from "fast-deep-equal";
const nodeTypes = { scalar: ScalarNode, group: GroupNode, array: ArrayLaneNode, choice: ChoiceNode };
export function VisualJsonFlow({ schema, value, onChange, onValidate }) {
    console.log('VisualJsonFlow component rendering');
    const ast = useMemo(() => compileSchemaToAst(schema), [schema]);
    const validator = useMemo(() => createValidator(schema), [schema]);
    const [selectedChoices, setSelectedChoices] = useState({});
    const [activeTab, setActiveTab] = useState('editor');
    const [validationErrors, setValidationErrors] = useState([]);
    // Debug: Log active tab changes
    React.useEffect(() => {
        console.log('Active tab changed to:', activeTab);
    }, [activeTab]);
    // Create initial nodes and edges
    const initialNodesAndEdges = useMemo(() => {
        const rfNodes = [];
        const rfEdges = [];
        const errorsByPath = {};
        const { errors } = validator.validate(value);
        errors?.forEach(e => { const p = (e.instancePath || "/"); (errorsByPath[p] ||= []).push(e.message || "Invalid"); });
        function bindData(n, errors) {
            const getValueAtPath = (path) => path.split("/").filter(Boolean).reduce((acc, k) => (acc ? acc[k] : undefined), value);
            const setValueAtPath = (path, v) => {
                const keys = path.split("/").filter(Boolean);
                const next = Array.isArray(value) || typeof value === "object" ? structuredClone(value) : {};
                let cur = next;
                for (let i = 0; i < keys.length - 1; i++) {
                    cur[keys[i]] = cur[keys[i]] ?? {};
                    cur = cur[keys[i]];
                }
                cur[keys[keys.length - 1]] = v;
                if (!equal(next, value))
                    onChange(next);
            };
            if (n.type === "scalar")
                return { node: n, path: n.path, value: getValueAtPath(n.path), onChange: (v) => setValueAtPath(n.path, v), errors };
            if (n.type === "array")
                return { node: n, path: n.path, value: getValueAtPath(n.path) ?? [], onChange: (v) => setValueAtPath(n.path, v), errors };
            if (n.type === "choice")
                return { node: n, selectedIndex: selectedChoices[n.path] ?? 0, onSelect: (i) => setSelectedChoices(s => ({ ...s, [n.path]: i })), errors };
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
            if (n.type === "group")
                n.children.forEach(cid => rfEdges.push({ id: `${n.id}-${cid}`, source: n.id, target: cid }));
            if (n.type === "array")
                rfEdges.push({ id: `${n.id}-${n.item}`, source: n.id, target: n.item });
            if (n.type === "choice")
                n.options.forEach((o, i) => rfEdges.push({ id: `${n.id}-${o.node}-${i}`, source: n.id, target: o.node }));
        });
        setValidationErrors(errors ?? []);
        onValidate?.(errors ?? []);
        console.log('Created nodes:', rfNodes);
        console.log('Created edges:', rfEdges);
        return { nodes: rfNodes, edges: rfEdges };
    }, [ast, value, selectedChoices, validator, setValidationErrors]);
    // Use ReactFlow's state management
    const [nodes, setNodes] = useState(initialNodesAndEdges.nodes);
    const [edges, setEdges] = useState(initialNodesAndEdges.edges);
    // Debug: Log nodes when they change
    React.useEffect(() => {
        console.log('Nodes state updated:', nodes);
    }, [nodes]);
    // Update nodes when data changes
    const updateNodesData = useCallback(() => {
        const errorsByPath = {};
        const { errors } = validator.validate(value);
        errors?.forEach(e => { const p = (e.instancePath || "/"); (errorsByPath[p] ||= []).push(e.message || "Invalid"); });
        setNodes((nds) => nds.map((node) => {
            const astNode = ast.nodes[node.id];
            if (!astNode)
                return node;
            const errors = errorsByPath[astNode.path] ?? [];
            const bindData = (n, errors) => {
                const getValueAtPath = (path) => path.split("/").filter(Boolean).reduce((acc, k) => (acc ? acc[k] : undefined), value);
                const setValueAtPath = (path, v) => {
                    const keys = path.split("/").filter(Boolean);
                    const next = Array.isArray(value) || typeof value === "object" ? structuredClone(value) : {};
                    let cur = next;
                    for (let i = 0; i < keys.length - 1; i++) {
                        cur[keys[i]] = cur[keys[i]] ?? {};
                        cur = cur[keys[i]];
                    }
                    cur[keys[keys.length - 1]] = v;
                    if (!equal(next, value))
                        onChange(next);
                };
                if (n.type === "scalar")
                    return { node: n, path: n.path, value: getValueAtPath(n.path), onChange: (v) => setValueAtPath(n.path, v), errors };
                if (n.type === "array")
                    return { node: n, path: n.path, value: getValueAtPath(n.path) ?? [], onChange: (v) => setValueAtPath(n.path, v), errors };
                if (n.type === "choice")
                    return { node: n, selectedIndex: selectedChoices[n.path] ?? 0, onSelect: (i) => setSelectedChoices(s => ({ ...s, [n.path]: i })), errors };
                return { node: n, errors };
            };
            return {
                ...node,
                data: bindData(astNode, errors)
            };
        }));
    }, [ast, value, selectedChoices, validator, setNodes, onChange]);
    // Update nodes when dependencies change
    React.useEffect(() => {
        updateNodesData();
    }, [updateNodesData]);
    // Handle node changes (including drag)
    const onNodesChange = useCallback((changes) => {
        console.log('Nodes changed:', changes);
        setNodes((nds) => {
            const updatedNodes = applyNodeChanges(changes, nds);
            console.log('Updated nodes:', updatedNodes);
            return updatedNodes;
        });
    }, [setNodes]);
    // Handle edge changes
    const onEdgesChange = useCallback((changes) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
    }, [setEdges]);
    // Format and organize the visual layout
    const handleFormat = useCallback(() => {
        console.log('Formatting layout...');
        // Get the current AST structure to understand the hierarchy
        const astNodes = Object.values(ast.nodes);
        // Create a new organized layout
        const formattedNodes = astNodes.map((node, index) => {
            const existingNode = nodes.find(n => n.id === node.id);
            if (!existingNode)
                return null;
            let x = 0;
            let y = 0;
            if (node.type === 'group') {
                // Root group nodes go on the left
                x = 0;
                y = index * 200;
            }
            else if (node.type === 'scalar' || node.type === 'array' || node.type === 'choice') {
                // Child nodes go to the right of their parent
                x = 300;
                y = index * 120;
            }
            return {
                ...existingNode,
                position: { x, y }
            };
        }).filter((node) => node !== null);
        // Update node positions
        setNodes(formattedNodes);
        // Fit view to show all nodes
        setTimeout(() => {
            // This will trigger a re-render and fit view
            console.log('Layout formatted!');
        }, 100);
    }, [ast, nodes, setNodes]);
    const renderContent = () => {
        console.log('Rendering content for tab:', activeTab);
        switch (activeTab) {
            case 'schema':
                console.log('Rendering SchemaView');
                return _jsx(SchemaView, { schema: schema });
            case 'preview':
                console.log('Rendering PreviewView');
                return _jsx(PreviewView, { value: value, errors: validationErrors, onChange: onChange });
            case 'editor':
            default:
                console.log('Rendering Editor (ReactFlow)');
                return (_jsx("div", { style: { flex: 1, position: "relative" }, children: _jsx(ReactFlowProvider, { children: _jsxs(ReactFlow, { nodes: nodes, edges: edges, nodeTypes: nodeTypes, fitView: true, fitViewOptions: { padding: 0.1 }, defaultEdgeOptions: { type: 'smoothstep' }, nodesDraggable: true, nodesConnectable: false, elementsSelectable: true, panOnDrag: true, zoomOnScroll: true, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, onNodeDragStart: (event, node) => {
                                console.log('Node drag start:', node.id);
                                console.log('Event:', event);
                                console.log('Node:', node);
                            }, onNodeDrag: (event, node) => {
                                console.log('Node dragging:', node.id);
                                console.log('Position:', node.position);
                            }, onNodeDragStop: (event, node) => {
                                console.log('Node drag stop:', node.id);
                                console.log('Final position:', node.position);
                            }, onMouseDown: (event) => console.log('Mouse down on canvas:', event), onConnect: (params) => console.log('Connect:', params), children: [_jsx(MiniMap, {}), _jsx(Controls, { children: _jsx(ControlButton, { onClick: handleFormat, title: "Format Layout", className: "react-flow__controls-button", children: _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M20 3L17 6L14 9L11 12L8 15L5 18", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M20 3L17 6L14 9L11 12L8 15L5 18", fill: "currentColor", fillOpacity: "0.2" }), _jsx("path", { d: "M22 5L20 3L18 5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })] }) }) }), _jsx(Background, {})] }) }) }));
        }
    };
    return (_jsxs("div", { style: { width: "100%", height: "100%", display: "flex", flexDirection: "column" }, children: [_jsx(Header, { projectName: "Visual JSON Flow", status: "active", activeTab: activeTab, onStatusChange: (status) => console.log('Status changed:', status), onTabChange: setActiveTab }), renderContent()] }));
}
export default VisualJsonFlow;
