export type NodeId = string;
export type ScalarKind = "string" | "number" | "integer" | "boolean" | "null";
export type UiNode =
  | { type: "group"; id: NodeId; path: string; title?: string; description?: string; children: NodeId[] }
  | { type: "scalar"; id: NodeId; path: string; title?: string; description?: string; scalar: ScalarKind; enum?: (string|number)[]; format?: string }
  | { type: "array"; id: NodeId; path: string; title?: string; description?: string; item: NodeId; minItems?: number; maxItems?: number }
  | { type: "choice"; id: NodeId; path: string; title?: string; description?: string; options: { label?: string; node: NodeId }[] };

export interface UiAst { root: NodeId; nodes: Record<NodeId, UiNode>; }
export interface CompileOptions { titleFallback?: (path: string) => string; }
