import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { authenticate } from '@/api/authenticate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  login: z.string(),
  password: z.string(),
})
type SignInForm = z.infer<typeof signInForm>

export const SignIn = () => {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      login: searchParams.get('login') ?? '',
      password: '',
    },
  })

  const { mutateAsync: signInAccount } = useMutation({
    mutationFn: authenticate,
  })

  const handleSignIn = async (data: SignInForm) => {
    const { login, password } = data
    try {
      await signInAccount({ login, password })
    } catch {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo cadastro</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center ">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>

            <p className="text-sm text-muted-foreground">
              Acompanhe os recebíveis e opere sobre eles.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">login:</Label>
              <Input id="email" type="text" {...register('login')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">senha:</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
