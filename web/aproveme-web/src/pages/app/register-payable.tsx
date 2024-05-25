import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { fetchAssignorsNames } from '@/api/fetch-assignors-names'
import { registerPayable } from '@/api/register-payable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Assignor {
  id: string
  name: string
}

const registerPayableForm = z.object({
  value: z.string(),
  assignorId: z.string().uuid(),
})
type RegisterPayableForm = z.infer<typeof registerPayableForm>

export const RegisterPayable = () => {
  const [assignorsNames, setAssignorsNames] = useState<Assignor[]>([])
  const [selectedAssignorId, setSelectedAssignorId] = useState<
    string | undefined
  >(undefined)

  const { mutateAsync: fetchAssignorsNamesFn } = useMutation({
    mutationFn: fetchAssignorsNames,
  })

  const { mutateAsync: registerPayableFn } = useMutation({
    mutationFn: registerPayable,
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<RegisterPayableForm>()

  const handleRegisterPayable = async (data: RegisterPayableForm) => {
    const { value, assignorId } = data

    if (!value || !assignorId) {
      toast.error('Todos os campos devem ser preenchidos!')
    } else {
      try {
        await registerPayableFn({
          value: Number(value),
          assignorId,
          emissionDate: new Date(),
        })

        toast.success('Recebível registrado com sucesso!')
      } catch {
        toast.error('Erro ao registar recebível.')
      }
    }
  }

  useEffect(() => {
    const handleFetchAssignorsNames = async () => {
      const data = await fetchAssignorsNamesFn()

      setAssignorsNames(data)
    }

    handleFetchAssignorsNames()
  }, [fetchAssignorsNamesFn])

  useEffect(() => {
    if (selectedAssignorId) {
      setValue('assignorId', selectedAssignorId)
    }
  }, [selectedAssignorId, setValue])

  return (
    <>
      <Helmet title="Novo Recebível" />
      <h1 className="text-3xl font-bold tracking-tight">Registrar Recebível</h1>
      <main className="mt-16 w-[500px] self-center">
        <section className="flex flex-col justify-center gap-6 ">
          <form
            onSubmit={handleSubmit(handleRegisterPayable)}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Valor</Label>{' '}
                <span className="text-xs">(R$)</span>
                <Input id="login" type="number" {...register('value')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Cedente</Label>
                <Select onValueChange={(value) => setSelectedAssignorId(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {assignorsNames.map((assignor) => (
                      <SelectItem key={assignor.id} value={assignor.id}>
                        {assignor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Registrar
            </Button>
          </form>
        </section>
      </main>
    </>
  )
}
