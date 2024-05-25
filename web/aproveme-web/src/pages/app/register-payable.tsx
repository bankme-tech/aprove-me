import { Helmet } from 'react-helmet-async'

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

export const RegisterPayable = () => {
  return (
    <>
      <Helmet title="Novo Recebível" />
      <h1 className="text-3xl font-bold tracking-tight">Registrar Recebível</h1>
      <main className="mt-16 w-[500px] self-center">
        <section className="flex flex-col justify-center gap-6 ">
          <form className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Valor</Label>{' '}
                <span className="text-xs">(R$)</span>
                <Input id="login" type="number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Cedente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">MST S.A.</SelectItem>
                    <SelectItem value="system">
                      Erick Etiene Simião Ferreira
                    </SelectItem>
                    <SelectItem value="dark">Friboi S.A.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={false}>
              Registrar
            </Button>
          </form>
        </section>
      </main>
    </>
  )
}
