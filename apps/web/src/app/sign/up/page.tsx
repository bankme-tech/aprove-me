'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { makeRegister } from '@/services/make-register';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(3, 'Min. 3 caracteres'),
  password: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const registerResponse = await makeRegister({
      username: data.username,
      password: data.password,
    });

    if (!registerResponse.success) {
      toast({
        description: registerResponse.error,
      });
      return;
    }

    toast({
      title: 'Conta criada com sucesso!',
      description: 'Faça o login para continuar',
    });
    router.push(`/sign/in?username=${data.username}`);
  });

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="max-w-[400px] shadow-md bg-white h-fit p-10 w-full text-center mt-[30vh] flex flex-col items-center">
        <div className="max-w-[300px]">
          <h2 className="font-bold text-xl">Criar uma conta</h2>
          <span className="text-gray-500">
            Informe um nome de usuário e uma senha para realizar o cadastro
          </span>
        </div>
        <form
          onSubmit={onSubmit}
          className="w-full"
          data-testid="register-form"
        >
          <div className="mt-5 flex flex-col gap-3 w-full">
            <Input
              {...register('username')}
              autoFocus
              placeholder="Nome de usuário"
            />
            {errors.username?.message && (
              <span className="text-red-400 text-sm -mt-1 text-left">
                {errors.username?.message}
              </span>
            )}

            <Input
              {...register('password')}
              type="password"
              placeholder="Senha"
            />

            <Button disabled={isSubmitting}>Cadastrar</Button>
            <Separator className="mt-2" />
            <span className="text-sm">
              Já possui uma conta?&nbsp;
              <Link
                href="/sign/in"
                className="cursor-pointer font-medium hover:underline"
              >
                Faça login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
