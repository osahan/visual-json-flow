import type { UiNode } from "@vjf/core";
export default function ScalarNode({ data }: {
    data: {
        node: UiNode;
        value: any;
        onChange: (v: any) => void;
        errors: string[];
    };
}): import("react/jsx-runtime").JSX.Element | null;
