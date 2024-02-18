import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function SignIn() {
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="max-w-[400px] shadow-md bg-white h-fit p-10 w-full text-center mt-[30vh] flex flex-col items-center">
        <div className="max-w-[250px]">
          <h2 className="font-bold text-xl">Faça login</h2>
          <span className="text-gray-500">
            Para utilizar o sistema, efetue login ou cadastre-se
          </span>
        </div>
        <div className="mt-5 flex flex-col gap-3 w-full">
          <Input placeholder="Nome de usuário" />
          <Input placeholder="Senha" />

          <Button>Entrar</Button>
          <Separator className="mt-2 mb-2" />
          {/* input */}
          <Button variant="outline">Crie uma conta</Button>
        </div>
      </div>
    </div>
  );
}
