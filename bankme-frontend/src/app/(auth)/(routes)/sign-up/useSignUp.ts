import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

// SERVICES
import { registerUser } from '@/services/auth.service';

const formSchema = z.object({
    login: z.string().min(1),
    password: z
        .string()
        .min(3, { message: 'Password must contain at least 3 character(s)' }),
});

type FormType = z.infer<typeof formSchema & FieldValues>;

const useSignIn = () => {
    const { push } = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: 'bankme',
            password: '123',
        },
    });

    const registerMutation = useMutation({
        mutationKey: [`register`],
        mutationFn: registerUser,
    });

    const handleSignUp: SubmitHandler<FormType> = useCallback(
        async (data, event) => {
            event?.preventDefault();

            toast.promise(registerMutation.mutateAsync(data), {
                loading: `Submitting...`,
                error: (error: any) => {
                    return (
                        error.response?.data ||
                        error.message ||
                        'Something went wrong'
                    );
                },
                success: `Registered successfully`,
            });
        },
        [registerMutation],
    );

    return {
        handleSubmit,
        handleSignUp,
        register,
        isLoading: registerMutation.isPending,
        errors,
    };
};

export { useSignIn };
