type TabType = 'editor' | 'schema' | 'preview';
interface HeaderProps {
    projectName?: string;
    status?: 'active' | 'inactive' | 'draft';
    activeTab?: TabType;
    onStatusChange?: (status: string) => void;
    onTabChange?: (tab: TabType) => void;
}
export declare function Header({ projectName, status, activeTab, onStatusChange, onTabChange }: HeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
