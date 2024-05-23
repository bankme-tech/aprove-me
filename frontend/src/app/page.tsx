'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoginData, loginValidationSchema } from "@/validations/login-validation"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { authenticate } from '@/lib/server/routes/login'
import { RedirectType, redirect, useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { saveToken, removeToken } from '@/lib/utils/token'


export default function Login() {
    const form = useForm<LoginData>({
        resolver: zodResolver(loginValidationSchema),
    })

    const router = useRouter()

    const { mutate } = useMutation({
        mutationFn: (data: LoginData) => authenticate(data),
        onError: (error) => {
            if(error.cause === 'Unauthorized'){
                removeToken()
                redirect('/', RedirectType.replace)
            }

            toast.error(error.message)
        },
        onSuccess: ({accessToken}) => {
            saveToken(accessToken)
            router.replace('/payables')
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(data => mutate(data))} className="space-y-8">
                <FormField
                    control={form.control}
                    name="login"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Login</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>DEMO: aprovame</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormDescription>DEMO: aprovame</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                

                <div className='space-x-2'>
                    <Button type="submit" disabled={form.formState.isSubmitting}>Entrar</Button>
                </div>
            </form>
        </Form>
    )
}