import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const SignUp = () => {
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

          <form className="space-y-3">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Seu login</Label>
                <Input id="login" type="text" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Sua senha</Label>
                <Input id="password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            <div className="flex w-full justify-center gap-6">
              {/* <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Seu nome</Label>
                  <Input id="name" type="text" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email"> Seu e-mail</Label>
                  <Input id="email" type="email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone"> Seu telefone</Label>
                  <Input id="phone" type="tel" />
                </div>
              </div> */}
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="document">Seu documento</Label>
              <span className="text-xs text-muted-foreground">
                {' '}
                (CPF | CNPJ)
              </span>
              <Input id="document" type="text" />
            </div> */}

            <Button type="submit" className="w-full" disabled={false}>
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
