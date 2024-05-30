import { NextPage } from 'next';
import Link from 'next/link';

// COMPONENTS
import { Button } from '@/components/ui/button';

const NotFoundPage: NextPage = () => {
    return (
        <div className="flex items-center justify-center flex-col gap-3 w-full h-screen">
            <h1 className="text-gray-600 text-3xl">Resource not found</h1>
            <Link href="/dashboard">
                <Button>Back Home</Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
