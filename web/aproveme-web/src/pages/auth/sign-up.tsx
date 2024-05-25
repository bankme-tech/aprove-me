import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createAccount } from '@/api/create-account'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  login: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
})
type SignUpForm = z.infer<typeof signUpForm>

export const SignUp = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: signUpAccount } = useMutation({
    mutationFn: createAccount,
  })

  const handleSignUp = async (data: SignUpForm) => {
    const { login, password, confirmPassword } = data

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.')
    } else {
      try {
        await signUpAccount({ login, password })

        toast.success('Conta criada com sucesso!', {
          action: {
            label: 'Login',
            onClick: () => navigate(`/sign-in?login=${login}`),
          },
        })
      } catch {
        toast.error('Erro ao criar conta. Tente novamente.')
      }
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[400px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center ">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta de operações
            </h1>

            <p className="text-sm text-muted-foreground">
              Opere sobre o fluxo de informações de forma prática.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-3">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Seu login</Label>
                <Input id="login" type="text" {...register('login')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Sua senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                />
              </div>
            </div>
            <div className="flex w-full justify-center gap-6"></div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossas
              <Link className="underline underline-offset-4" to="#">
                {' '}
                Políticas de Privacidade
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
