'use client'

import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input/react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AssignorData, assignorValidationSchema } from "@/validations/assignor-validation"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { registerAssignor } from '@/lib/server/routes/register-assignor'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getToken } from '@/lib/utils/token'
import { redirect, RedirectType } from 'next/navigation'

export const NewAssignor: React.FunctionComponent = () => {
    const token = getToken()

    if(!token) redirect('/', RedirectType.replace)
    const [open, setOpen] = useState(false);

    const form = useForm<AssignorData>({
        resolver: zodResolver(assignorValidationSchema),
    })

    const { invalidateQueries } = useQueryClient()
    
    const {mutate} = useMutation({
        mutationFn: (data: AssignorData) => registerAssignor(data, {token}),
        onError: (error) => toast.error(error.message),

        onSuccess: () => {
            toast.success('Cedente registrado com sucesso!')
            invalidateQueries({queryKey: ['assignors'], exact: true})
            setOpen(false)
        }
    })

    useEffect(() => {
        if(!open) form.reset()
    }, [open, form])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button size='sm'>Registrar Cedente</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar cedente</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(data => mutate(data))} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type='email' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex flex-col space-y-2'>
                            <Label htmlFor='phone'>Telefone</Label>

                            <PhoneInput
                                control={form.control}
                                name="phone"
                                rules={{ required: true }}
                                inputComponent={Input}
                            />
                        </div>


                        <FormField
                            control={form.control}
                            name="document"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Document</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
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