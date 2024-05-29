'use client';

import { useCallback } from 'react';
import { NextPage } from 'next';
import { toast } from 'sonner';
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// SERVICES
import { createAssignor } from '@/services/assignor.service';

// COMPONENTS
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IAssignor } from '@/interfaces/assignor.interface';

const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    document: z.string().min(1),
    phone: z.string().min(1),
});

type FormType = z.infer<typeof formSchema & FieldValues>;

const NewAssignorPage: NextPage = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            document: '',
            phone: '',
        },
    });

    const queryClient = useQueryClient();
    const createAssignorMutation = useMutation({
        mutationKey: [`create-assignor`],
        mutationFn: createAssignor,
        onSuccess: (data) => {
            queryClient.setQueryData(
                [`list-assignors`],
                (oldData?: IAssignor[]) => {
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

            toast.promise(createAssignorMutation.mutateAsync(data), {
                loading: `Submitting...`,
                success: `Assignor created successfully`,
                error: `Something went wrong`,
            });
        },
        [createAssignorMutation],
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <Input
                className="w-full md:max-w-[50%]"
                placeholder="type here"
                type="text"
                id="name"
                label="Name"
                register={register('name', { required: true })}
                errors={errors}
            />

            <Input
                className="w-full md:max-w-[50%]"
                placeholder="type here"
                type="email"
                id="email"
                label="Email"
                register={register('email', { required: true })}
                errors={errors}
            />

            <Input
                className="w-full md:max-w-[50%]"
                placeholder="type here"
                type="text"
                id="document"
                label="Document"
                register={register('document', { required: true })}
                errors={errors}
            />

            <Input
                className="w-full md:max-w-[50%]"
                placeholder="type here"
                type="phone"
                id="phone"
                label="Phone"
                register={register('phone', { required: true })}
                errors={errors}
            />

            <Button
                type="submit"
                loading={createAssignorMutation.isPending}
                disabled={createAssignorMutation.isPending}
                className="w-full md:max-w-[50%]"
            >
                Create
            </Button>
        </form>
    );
};

export default NewAssignorPage;
