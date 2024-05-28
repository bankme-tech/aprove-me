"use client";

import { AuthForm, authSchema } from "@/components/forms/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth/use-auth";
import { z } from "zod";

export default function Auth() {
  const { login, register, error } = useAuth();

  const handleLoginSubmit = async (data: z.infer<typeof authSchema>) => {
    const formData = authSchema.safeParse(data);
    if (formData.success) {
      await login(data);
    }
  };

  const handleRegisterSubmit = async (data: z.infer<typeof authSchema>) => {
    const formData = authSchema.safeParse(data);
    if (formData.success) {
      await register(data);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md ">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Entre</CardTitle>
                <CardDescription>
                  Acesse com seu nome de usuário e senha.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <AuthForm onSubmit={handleLoginSubmit} version="login" />
                {error && (
                  <p className="text-red-600 font-semibold underline text-center">
                    {error}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro</CardTitle>
                <CardDescription>
                  Faça o cadastro com nome de usuário e senha.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <AuthForm onSubmit={handleRegisterSubmit} version="register" />
                {error && (
                  <p className="text-red-600 font-semibold underline text-center">
                    {error}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
