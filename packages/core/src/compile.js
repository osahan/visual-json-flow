let idSeq = 0;
const nid = () => `n${idSeq++}`;
export function compileSchemaToAst(schema, _opts = {}, basePath = "") {
    idSeq = 0;
    const nodes = {};
    const root = walk(schema, basePath);
    return { root, nodes };
    function walk(s, path) {
        if (!s || typeof s !== "object")
            s = {};
        if (s.$ref)
            throw new Error("Refs not supported in MVP (resolve externally first).");
        if (Array.isArray(s.oneOf)) {
            const id = nid();
            const options = s.oneOf.map((opt, i) => ({ label: opt.title ?? `Option ${i + 1}`, node: walk(opt, path) }));
            nodes[id] = { type: "choice", id, path, title: s.title, description: s.description, options };
            return id;
        }
        if (s.type === "array" && s.items) {
            const id = nid();
            const item = walk(s.items, `${path}/*`);
            nodes[id] = { type: "array", id, path, title: s.title, description: s.description, item, minItems: s.minItems, maxItems: s.maxItems };
            return id;
        }
        if (s.type === "object" || s.properties) {
            const id = nid();
            const children = [];
            const props = s.properties ?? {};
            for (const key of Object.keys(props)) {
                const childPath = path ? `${path}/${key}` : `/${key}`;
                const childNode = wrapLabeled(props[key], key);
                const childId = walk(childNode, childPath);
                children.push(childId);
            }
            nodes[id] = { type: "group", id, path, title: s.title, description: s.description, children };
            return id;
        }
        const id = nid();
        const scalar = s.type ?? "string";
        const enumVals = Array.isArray(s.enum) ? s.enum : undefined;
        nodes[id] = { type: "scalar", id, path, title: s.title, description: s.description, scalar, enum: enumVals, format: s.format };
        return id;
    }
    function wrapLabeled(s, key) { if (!s.title)
        s = { ...s, title: s.title ?? key }; return s; }
}
