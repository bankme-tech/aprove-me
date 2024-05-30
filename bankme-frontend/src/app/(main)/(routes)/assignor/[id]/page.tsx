'use client';

import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

// SERVICES
import { getAssignor } from '@/services/assignor.service';

// COMPONENTS
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/ui/input';

interface AssignorDetailsPageProps {
    params: {
        id: string;
    };
}

const AssignorDetailsPage: NextPage<AssignorDetailsPageProps> = ({
    params: { id },
}) => {
    const getAssignorQuery = useQuery({
        queryKey: [`assignor-details-${id}`],
        queryFn: () => getAssignor(id),
    });

    if (getAssignorQuery.isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!getAssignorQuery.data) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-3">
            <Input
                className="w-full md:max-w-[50%]"
                placeholder="type here"
                type="text"
                id="name"
                label="Name"
                value={getAssignorQuery.data.name}
                disabled
            />

            <Input
                className="w-full md:max-w-[50%]"
                placeholder="type here"
                type="email"
                id="email"
                label="Email"
                value={getAssignorQuery.data.email}
                disabled
            />

            <Input
                className="w-full md:max-w-[50%]"
                placeholder="type here"
                type="text"
                id="document"
                label="Document"
                value={getAssignorQuery.data.document}
                disabled
            />

            <Input
                className="w-full md:max-w-[50%]"
                placeholder="type here"
                type="phone"
                id="phone"
                label="Phone"
                value={getAssignorQuery.data.phone}
                disabled
            />
        </div>
    );
};

export default AssignorDetailsPage;
