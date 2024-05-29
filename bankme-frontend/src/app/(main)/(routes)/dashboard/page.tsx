'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { NextPage } from 'next';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

// SERVICES
import { deletePayable, listPayable } from '@/services/payable.service';

// INTERFACES
import { IPayable } from '@/interfaces/payable.interface';

// COMPONENTS
import { DataTable } from '../../_components/table';
import { Spinner } from '@/components/spinner';

const columnHelper = createColumnHelper<any>();

const DashboardPage: NextPage = () => {
    const queryClient = useQueryClient();
    const payableQuery = useQuery({
        queryKey: [`list-payable`],
        queryFn: listPayable,
    });
    const deletePayableMutation = useMutation({
        mutationKey: [`delete-payable`],
        mutationFn: deletePayable,
        onSuccess: (data) => {
            queryClient.setQueryData(
                [`list-payable`],
                (oldData?: IPayable[]) => {
                    if (!oldData) return oldData;

                    return [
                        ...oldData.filter((payable) => payable.id !== data.id),
                    ];
                },
            );
        },
    });

    const onDelete = async (payableId: string) => {
        toast.promise(deletePayableMutation.mutateAsync(payableId), {
            loading: `Submitting...`,
            success: `Deleted successfully`,
            error: `Something went wrong`,
        });
    };

    const tableColumns = useMemo(() => {
        return [
            {
                accessorKey: `id`,
                cell: ({ getValue }) => getValue(),
            },
            columnHelper.accessor('emissionDate', {
                header: `Emission Date`,
                cell: (info) => info.getValue(),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor('value', {
                header: `Value`,
                cell: (info) => info.getValue(),
                footer: (info) => info.column.id,
                filterFn: 'includesString',
            }),
            {
                accessorKey: `actions`,
                header: `Actions`,
                enableSorting: false,
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center justify-center gap-4">
                            <Link href={`/payable/${row.getValue(`id`)}`}>
                                <Pencil
                                    className="cursor-pointer text-emerald-600"
                                    size={20}
                                />
                            </Link>
                            <Trash2
                                onClick={() => onDelete(row.getValue(`id`))}
                                className="cursor-pointer text-red-400"
                                size={20}
                            />
                        </div>
                    );
                },
            },
        ];
    }, []);

    if (payableQuery.isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return <DataTable data={payableQuery.data ?? []} columns={tableColumns} />;
};

export default DashboardPage;
