import { ChevronFirst, ChevronLast } from 'lucide-react';

// PROVIDERS
import { useSidebar } from '@/providers/sidebar.provider';

// COMPONENTS
import { Logo } from '@/components/logo';

interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const { expanded, handleExpand } = useSidebar();

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <div
                        className={`overflow-hidden transition-all
                        ${expanded ? 'w-12' : 'w-0'}`}
                    >
                        <Logo />
                    </div>

                    <button
                        onClick={handleExpand}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <ul className="flex-1 px-3">{children}</ul>
            </nav>
        </aside>
    );
};

export { Sidebar };
