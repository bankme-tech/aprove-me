import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppContext } from '@/contexts/app-context'

const registerAssignorForm = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  document: z.string(),
})
type RegisterAssignorForm = z.infer<typeof registerAssignorForm>

export const RegisterAssignor = () => {
  const { registerAssignorFn } = useAppContext()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterAssignorForm>()

  const handleRegisterAssignor = async (data: RegisterAssignorForm) => {
    const { document, email, name, phone } = data

    if (!document || !email || !name || !phone) {
      toast.error('Todos os campos devem ser preenchidos!')
    } else {
      try {
        await registerAssignorFn({ document, email, name, phone })

        toast.success('Cedente registrado com sucesso!')
      } catch {
        toast.error('Erro ao registrar cedente.')
      }
    }
  }

  return (
    <>
      <Helmet />
      <h1 className="text-3xl font-bold tracking-tight">Registrar Cedente</h1>

      <main className=" w-[500px] self-center">
        <section className="flex flex-col justify-center gap-6">
          <form
            onSubmit={handleSubmit(handleRegisterAssignor)}
            className="space-y-7    "
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" {...register('name')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="flex gap-6">
              <div className="w-full space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" type="tel" {...register('phone')} />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="document">Documento</Label>
                <span className="text-xs text-muted-foreground">
                  &nbsp; (CPF | CNPJ)
                </span>
                <Input id="document" type="text" {...register('document')} />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>
          </form>
        </section>
      </main>
    </>
  )
}
