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

const formSchema = z.object({
  username: z.string().min(1, { message: "Username precisa ter no mínimo 1 carater" }),
  password: z.string().min(1, { message: "Senha precisa ter no mínimo 1 carater" }),
});

export default function Page() {
  const [formType, setFormType] = useState<"login" | "register">('login');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(formType, ": ", values);
  }

  const credentialContent =
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input id="username" autoFocus {...field} />
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
                    Digite o username e senha para acessar o nosso sistema
                    ou clique em cadastrar para criar uma nova conta.
                  </CardDescription>
                </CardHeader>

                {credentialContent}

                <CardFooter>
                  <Button type="submit">Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Cadastrar</CardTitle>
                  <CardDescription>
                    Cadastre sua conta aqui aperte em "cadastrar e entrar" para acessar a plataforma
                    ou clique entrar se já possuir cadastro.
                  </CardDescription>
                </CardHeader>

                {credentialContent}

                <CardFooter>
                  <Button type="submit">Cadastrar</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

        </ form >
      </ Form >
    </main>
  );
}
