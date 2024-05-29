'use client';

import { createContext, useContext, useState } from 'react';

interface SidebarContextData {
    expanded: boolean;
    handleExpand: () => void;
}

const SidebarContext = createContext<SidebarContextData>(
    {} as SidebarContextData,
);

interface SidebarProviderProps {
    children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
    children,
}) => {
    const [expanded, setExpanded] = useState<boolean>(true);

    const handleExpand = () => {
        setExpanded((old) => !old);
    };

    const sidebarContextData: SidebarContextData = {
        expanded,
        handleExpand,
    };

    return (
        <SidebarContext.Provider value={sidebarContextData}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
