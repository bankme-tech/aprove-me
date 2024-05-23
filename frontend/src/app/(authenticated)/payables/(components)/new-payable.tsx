'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PayableData, payableValidationSchema } from "@/validations/payable-validation"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { FormDatePicker } from '@/components/ui/form-date-picker'
import { registerPayable } from '@/lib/server/routes/register-payable'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { FormComboBox } from '@/components/ui/form-combo-box'
import { getToken, removeToken } from '@/lib/utils/token'
import { useMutation, useQuery } from '@tanstack/react-query'
import { listAssignors } from '@/lib/server/routes/list-assignors'
import { RedirectType, redirect } from 'next/navigation'
import { getQueryClient, queryClient } from '@/providers/client-react-query'

export const NewPayable: React.FunctionComponent = () => {
    const [open, setOpen] = useState(false);

    const token = getToken()

    if(!token) redirect('/', RedirectType.replace)

    const { data, isLoading: isGettingAssignors } = useQuery({
        queryKey: ['assignors'],
        queryFn: () => listAssignors({token}),
        retry: false,
        refetchOnWindowFocus: false
    })

    const assignors = data?.map(assignor => ({ value: assignor.id, label: assignor.name })) || []

    const form = useForm<PayableData>({
        resolver: zodResolver(payableValidationSchema),
        defaultValues: { value: 0 }
    })


    const { mutate } = useMutation({
        retry: false,
        mutationFn: (data: PayableData) => registerPayable(
            {
                ...data,
                assignor: data.assignorId,
                emissionDate: data.emissionDate.toISOString()
            },
            {token}
        ),
        onError: (error) => {
            if(error.cause === 'Unauthorized'){
                removeToken()
                redirect('/', RedirectType.replace)
            }
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Pagável registrado com sucesso!')
            queryClient.invalidateQueries({queryKey: ['payables'], exact: true})
            setOpen(false)
        }
    })

    useEffect(() => {
        if(!open) form.reset()
    }, [open, form])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button size='sm'>Registrar Pagável</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar pagável</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="assignorId"
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Cedente</FormLabel>
                                    {isGettingAssignors ? (
                                        <p>Carregando cedentes...</p>
                                    ) : (
                                        <FormControl>
                                            <FormComboBox
                                                field={field}
                                                items={assignors}
                                                onSelect={(assignor) => form.setValue("assignorId", assignor)}
                                            />
                                        </FormControl>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="emissionDate"
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Data de emissão</FormLabel>
                                    <FormDatePicker field={field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose>
                                <Button type='button' variant='ghost'>Fechar</Button>
                            </DialogClose>

                            <Button type="submit" disabled={form.formState.isSubmitting}>Registrar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}