'use client';

import { useCallback } from 'react';
import { NextPage } from 'next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// SERVICES
import { listAssignors } from '@/services/assignor.service';
import { createPayable } from '@/services/payable.service';

// INTERFACES
import { IPayable } from '@/interfaces/payable.interface';

// COMPONENTS
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/spinner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
    value: z
        .string()
        .min(1)
        .regex(
            /^[0-9]+$/,
            'O valor deve conter apenas caracteres numéricos de 0 a 9',
        ),
    assignorId: z.string().min(1),
});

type FormType = z.infer<typeof formSchema & FieldValues>;

const NewPayablePage: NextPage = () => {
    const {
        handleSubmit,
        register,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: '',
            assignorId: '',
        },
    });

    const queryClient = useQueryClient();
    const assignorQuery = useQuery({
        queryKey: [`list-assignors`],
        queryFn: listAssignors,
    });
    const createPayableMutation = useMutation({
        mutationKey: [`create-payable`],
        mutationFn: createPayable,
        onSuccess: (data) => {
            queryClient.setQueryData(
                [`list-payable`],
                (oldData?: IPayable[]) => {
                    if (!oldData) return oldData;

                    return [data, ...oldData];
                },
            );
            reset();
        },
    });

    const onSubmit: SubmitHandler<FormType> = useCallback(
        async (data, event) => {
            event?.preventDefault();

            toast.promise(createPayableMutation.mutateAsync(data), {
                loading: `Submitting...`,
                success: `Payable created successfully`,
                error: `Something went wrong`,
            });
        },
        [createPayableMutation],
    );

    if (assignorQuery.isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
                    <SelectValue placeholder="Assignor" />
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
                loading={createPayableMutation.isPending}
                disabled={createPayableMutation.isPending}
                className="w-full md:max-w-[50%]"
            >
                Create
            </Button>
        </form>
    );
};

export default NewPayablePage;
