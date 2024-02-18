'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { makeLogin } from '@/services/make-login';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export default function SignInPage() {
  const { toast } = useToast();
  const { updateSessionToken, updateUsername } = useAuth();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const authResponse = await makeLogin({
      username: data.username,
      password: data.password,
    });

    if (!authResponse.success) {
      toast({
        description: authResponse.error,
      });
      return;
    }

    updateSessionToken(authResponse.data!.token);
    updateUsername(authResponse.data!.username);

    router.push('/');
  });

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="max-w-[400px] shadow-md bg-white h-fit p-10 w-full text-center mt-[30vh] flex flex-col items-center">
        <div className="max-w-[250px]">
          <h2 className="font-bold text-xl">Faça login</h2>
          <span className="text-gray-500">
            Para utilizar o sistema, efetue login ou cadastre-se
          </span>
        </div>
        <form onSubmit={onSubmit} className="w-full" data-testid="login-form">
          <div className="mt-5 flex flex-col gap-3 w-full">
            <Input
              {...register('username')}
              required
              placeholder="Nome de usuário"
            />
            <Input
              {...register('password')}
              required
              type="password"
              placeholder="Senha"
            />

            <Button disabled={isSubmitting}>Entrar</Button>
            <Separator className="mt-2 mb-2" />
            {/* input */}
            <Link href="/sign/up">
              <Button variant="outline" className="w-full">
                Crie uma conta
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
