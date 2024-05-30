'use client';

import { useCallback } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// SERVICES
import { getPayable, updatePayable } from '@/services/payable.service';
import { listAssignors } from '@/services/assignor.service';

// INTERFACES
import { IPayable } from '@/interfaces/payable.interface';

// COMPONENTS
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    value: z
        .string()
        .min(1)
        .regex(/^[0-9]+$/),
    assignorId: z.string().min(1),
});

type FormType = z.infer<typeof formSchema & FieldValues>;

interface PayableDetailsPageProps {
    params: {
        id: string;
    };
}

const PayableDetailsPage: NextPage<PayableDetailsPageProps> = ({
    params: { id },
}) => {
    const queryClient = useQueryClient();
    const getPayableQuery = useQuery({
        queryKey: [`get-payable-${id}`],
        queryFn: async () => {
            const payable = await getPayable(id);
            return payable;
        },
    });
    const assignorQuery = useQuery({
        queryKey: [`list-assignors`],
        queryFn: listAssignors,
    });
    const updatePayableMutation = useMutation({
        mutationKey: [`update-payable-${id}`],
        mutationFn: updatePayable,
        onSuccess: (data) => {
            queryClient.setQueryData(
                [`list-payable`],
                (oldData?: IPayable[]) => {
                    if (!oldData) return oldData;

                    const oldItemIndex = oldData.findIndex(
                        (item) => item.id === data.id,
                    );
                    oldData[oldItemIndex] = data;
                    return [...oldData];
                },
            );
        },
    });

    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(formSchema),
        values: {
            value: `${getPayableQuery.data?.value}` ?? '',
            assignorId: getPayableQuery.data?.assignorId ?? '',
        },
    });

    const onSubmit: SubmitHandler<FormType> = useCallback(
        async (data, event) => {
            event?.preventDefault();

            toast.promise(
                updatePayableMutation.mutateAsync({ payableId: id, data }),
                {
                    loading: `Submitting...`,
                    success: `Payable created successfully`,
                    error: `Something went wrong`,
                },
            );
        },
        [id, updatePayableMutation],
    );

    if (getPayableQuery.isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!getPayableQuery.data) {
        notFound();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <Link href={`/assignor/${getPayableQuery.data.assignorId}`}>
                <Button variant="secondary">Visit current Assignor</Button>
            </Link>
            <Input
                className="w-full md:max-w-[50%]"
                placeholder="Payable Value"
                type="number"
                id="value"
                register={register('value', { required: true })}
                errors={errors}
            />

            <Select
                value={watch('assignorId')}
                defaultValue={watch('assignorId')}
                onValueChange={(v) => setValue('assignorId', v)}
            >
                <SelectTrigger className="w-full md:max-w-[50%]">
                    <SelectValue
                        placeholder={
                            assignorQuery.isLoading ? `Loading...` : `Assignor`
                        }
                    />
                </SelectTrigger>
                <SelectContent>
                    {assignorQuery.data?.map((assignor) => (
                        <SelectItem key={assignor.id} value={assignor.id}>
                            {assignor.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button
                type="submit"
                loading={updatePayableMutation.isPending}
                disabled={updatePayableMutation.isPending}
                className="w-full md:max-w-[50%]"
            >
                Update
            </Button>
        </form>
    );
};

export default PayableDetailsPage;
