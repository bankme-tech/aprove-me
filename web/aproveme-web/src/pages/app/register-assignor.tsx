import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const RegisterAssignor = () => {
  return (
    <>
      <Helmet />
      <h1 className="text-3xl font-bold tracking-tight">Registrar Cedente</h1>

      <main className=" w-[500px] self-center">
        <section className="flex flex-col justify-center gap-6">
          <form className="space-y-7    ">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>

            <div className="flex gap-6">
              <div className="w-full space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" type="tel" />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="document">Documento</Label>
                <span className="text-xs text-muted-foreground">
                  &nbsp; (CPF | CNPJ)
                </span>
                <Input id="document" type="text" />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={false}>
              Finalizar cadastro
            </Button>
          </form>
        </section>
      </main>
    </>
  )
}
