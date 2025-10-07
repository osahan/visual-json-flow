import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "reactflow";
export default function ChoiceNode({ data }) {
    if (data.node.type !== "choice")
        return null;
    const n = data.node;
    return (_jsxs("div", { className: `vjf-node ${data.errors.length ? "vjf-error" : ""}`, children: [_jsx("div", { className: "vjf-title", children: n.title ?? n.path }), _jsx("div", { className: "choice-options", children: n.options.map((opt, i) => (_jsx("button", { onClick: () => data.onSelect(i), className: `choice-option ${i === data.selectedIndex ? "choice-option-selected" : ""}`, children: opt.label ?? `Option ${i + 1}` }, i))) }), data.errors.length > 0 && _jsx("div", { className: "vjf-badge", children: data.errors[0] }), _jsx(Handle, { type: "target", position: Position.Left }), _jsx(Handle, { type: "source", position: Position.Right })] }));
}
