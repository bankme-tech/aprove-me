'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

// PROVIDERS
import { SidebarProvider } from '@/providers/sidebar.provider';

// COMPONENTS
import { Layout } from './_components/layout';
import { Spinner } from '@/components/spinner';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { status } = useSession();

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return redirect('/');
    }

    return (
        <SidebarProvider>
            <Layout>{children}</Layout>
        </SidebarProvider>
    );
}
