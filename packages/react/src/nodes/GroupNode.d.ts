import type { UiNode } from "@vjf/core";
export default function GroupNode({ data }: {
    data: {
        node: UiNode;
        errors: string[];
    };
}): import("react/jsx-runtime").JSX.Element | null;
