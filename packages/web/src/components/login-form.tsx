"use client";

import { z } from "zod";
import { useState } from "react";
import { AxiosError } from "axios";
import { axiosInstance } from "@/api/api";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";

const formSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export function LoginForm() {
  const router = useRouter();
  const { updateSessionToken } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axiosInstance.post<{ token: string }>("/auth", values);

      updateSessionToken(data.token);
      router.push("/payables");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setLoginError("Credenciais invalidas");
        } else {
          setLoginError("Algo deu errado");
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-w-80">
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loginError && <p className="text-red-500">{loginError}</p>}
        <div className="flex justify-between">
          <Button type="submit">Logar</Button>
          <Link href="/signup">
            <Button variant="outline">Criar conta</Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
