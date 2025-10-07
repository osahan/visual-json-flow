import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function SchemaView({ schema }) {
    return (_jsxs("div", { className: "vjf-schema-view", children: [_jsxs("div", { className: "vjf-schema-header", children: [_jsx("h2", { children: "JSON Schema" }), _jsx("p", { children: "This is the schema that defines the structure of your data." })] }), _jsx("div", { className: "vjf-schema-content", children: _jsx("pre", { className: "vjf-schema-json", children: JSON.stringify(schema, null, 2) }) })] }));
}
