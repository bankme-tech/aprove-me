// COMPONENTS
import { Navbar } from '@/components/navbar';

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full min-h-screen">
            <Navbar />
            {children}
        </main>
    );
}
