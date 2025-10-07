import "reactflow/dist/style.css";
import "./styles.css";
type Props = {
    schema: any;
    value: any;
    onChange: (v: any) => void;
    onValidate?: (errors: any[]) => void;
};
export declare function VisualJsonFlow({ schema, value, onChange, onValidate }: Props): import("react/jsx-runtime").JSX.Element;
export default VisualJsonFlow;
