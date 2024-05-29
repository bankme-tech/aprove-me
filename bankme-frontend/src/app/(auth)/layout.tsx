'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

// COMPONENTS
import { Spinner } from '@/components/spinner';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { status } = useSession();

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <Spinner />
            </div>
        );
    }

    if (status === 'authenticated') {
        return redirect('/dashboard');
    }

    return (
        <main className="flex items-center justify-center h-screen p-2">
            {children}
        </main>
    );
}
