import type { UiNode } from "@vjf/core";
export default function ChoiceNode({ data }: {
    data: {
        node: UiNode;
        selectedIndex: number;
        onSelect: (i: number) => void;
        errors: string[];
    };
}): import("react/jsx-runtime").JSX.Element | null;
