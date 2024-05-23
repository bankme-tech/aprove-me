'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PayableData, payableValidationSchema } from "@/validations/payable-validation"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { FormDatePicker } from '@/components/ui/form-date-picker'
import { toast } from 'sonner'
import { FormComboBox } from '@/components/ui/form-combo-box'
import { Label } from '@/components/ui/label'
import { updatePayable } from '@/lib/server/routes/update-payable'
import { DeletePayable } from './delete-payable'
import { useMutation, useQuery } from '@tanstack/react-query'
import { listAssignors } from '@/lib/server/routes/list-assignors'
import { getToken, removeToken } from '@/lib/utils/token'
import { RedirectType, redirect } from 'next/navigation'
import { queryClient } from '@/providers/client-react-query'

interface PayableFormProps {
    payableId: string
    initialValues: {
        value: number
        emissionDate: Date
        assignorId: string
    }
}

export const PayableForm: React.FunctionComponent<PayableFormProps> = ({ payableId, initialValues }) => {
    const token = getToken()

    if(!token) redirect('/', RedirectType.replace)

    const { data, isLoading: isGettingAssignors } = useQuery({
        queryKey: ['assignors'],
        queryFn: () => listAssignors({token}),
        retry: false,
        refetchOnWindowFocus: false
    })

    const assignors = data?.map(assignor => ({ value: assignor.id, label: assignor.name })) || []

    const { mutate } = useMutation({
        retry: false,
        mutationFn: ({ emissionDate, ...data }: PayableData) => 
            updatePayable(
                { 
                    ...data,
                    id: payableId,
                    emissionDate: emissionDate.toISOString()
                },
                { token }
            ),
            onError: (error) => {
                if(error.cause === 'Unauthorized'){
                removeToken()
                redirect('/', RedirectType.replace)
            }
                toast.error(error.message)
            },
            onSuccess: () => {
                toast.success('Pagável atualizado com sucesso!')
                queryClient.invalidateQueries({ queryKey: ['payables']})
            }
        })


    const form = useForm<PayableData>({
        resolver: zodResolver(payableValidationSchema),
        defaultValues: initialValues
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(data => mutate(data))} className="space-y-8">
                <div>
                    <Label htmlFor='payable-id'>ID</Label>
                    <Input value={payableId} name='payable-id' disabled />
                </div>

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

                

                <div className='space-x-2'>
                    <DeletePayable payableId={payableId} />
                    <Button type="submit" disabled={form.formState.isSubmitting}>Atualizar</Button>
                </div>
            </form>
        </Form>
    )
}