'use client';

import { useSidebar } from '@/providers/sidebar.provider';

interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon,
    text,
    active = false,
}) => {
    const { expanded } = useSidebar();

    return (
        <li
            className={`relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer transition-colors
            ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 text-gray-600'}`}
        >
            {icon}

            <span
                className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}
            >
                {expanded && text}
            </span>
        </li>
    );
};

export { SidebarItem };
