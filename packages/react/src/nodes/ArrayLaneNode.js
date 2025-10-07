import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "reactflow";
export default function ArrayLaneNode({ data }) {
    if (data.node.type !== "array")
        return null;
    const n = data.node;
    const items = Array.isArray(data.value) ? data.value : [];
    const addItem = () => data.onChange([...(items ?? []), null]);
    const del = (i) => data.onChange(items.filter((_, idx) => idx !== i));
    return (_jsxs("div", { className: `vjf-node vjf-lane ${data.errors.length ? "vjf-error" : ""}`, children: [_jsx("div", { className: "vjf-title", children: n.title ?? n.path }), _jsxs("div", { className: "array-items", children: [items.map((_, i) => (_jsxs("div", { className: "array-item", children: [_jsxs("div", { className: "array-item-label", children: ["Item ", i + 1] }), _jsx("button", { className: "array-item-delete", onClick: () => del(i), children: "Delete" })] }, i))), _jsx("button", { className: "array-add-button", onClick: addItem, children: "+ Add item" })] }), data.errors.length > 0 && _jsx("div", { className: "vjf-badge", children: data.errors[0] }), _jsx(Handle, { type: "target", position: Position.Left }), _jsx(Handle, { type: "source", position: Position.Right })] }));
}
