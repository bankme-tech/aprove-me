"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { AUTH_TOKEN, apiCall } from "@/lib/api-call";
import { AuthLoginResponse, AuthRegistered } from "@/interfaces/auth.interface";
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  login: z.string().min(1, { message: "Username precisa ter no mínimo 1 caractere" }),
  password: z.string().min(1, { message: "Senha precisa ter no mínimo 1 caractere" }),
});

export default function AuthForm() {
  const [formType, setFormType] = useState<"login" | "register">('login');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { login: "", password: "" },
  });
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(credential: z.infer<typeof formSchema>) {
    if (formType === 'register') {
      await apiCall<AuthRegistered>({
        endpoint: "/integrations/auth",
        method: "POST",
        body: credential,
      });
      // TODO: show toaster message.
    }

    const res = await apiCall<AuthLoginResponse>({
      endpoint: "/integrations/auth/login",
      method: "POST",
      body: credential,
    });

    if (res.result?.token) {
      localStorage.setItem(AUTH_TOKEN, res.result.token);
      router.push("/pagaveis");
    }
  }

  const credentialContent =
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="login">Username</FormLabel>
              <FormControl>
                <Input id="login" autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-1">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormControl>
                <Input id="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </CardContent>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" onClick={() => setFormType('login')}>
              Entrar
            </TabsTrigger>
            <TabsTrigger value="password" onClick={() => setFormType('register')}>
              Cadastrar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Entrar</CardTitle>
                <CardDescription>
                  Digite o login e senha para acessar o nosso sistema
                  ou clique em cadastrar para criar uma nova conta.
                </CardDescription>
              </CardHeader>

              {credentialContent}

              <CardFooter>
                <Button type="submit">Entrar</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Cadastrar</CardTitle>
                <CardDescription>
                  Cadastre sua conta aqui aperte em &quot;cadastrar e entrar&quot; para acessar a plataforma
                  ou clique entrar se já possuir cadastro.
                </CardDescription>
              </CardHeader>

              {credentialContent}

              <CardFooter>
                <Button type="submit"
                  onClick={
                    () => { toast({ title: "Cadastro concluido" }) }
                  }
                >Cadastrar</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </ form>
    </ Form>
  );
}
