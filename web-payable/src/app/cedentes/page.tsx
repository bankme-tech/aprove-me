"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from "react";
import { apiCall } from "@/lib/api-call";
import { useRouter } from "next/navigation";

function limitMessage(key: string, limit: number) {
  return `${key} com caracteres acima do limite ${limit} caracteres`;
}
const formSchema = z.object({
  name: z.string().max(140, { message: limitMessage("Email", 140) }),
  document: z.coerce
    .string()
    .max(30, { message: limitMessage("Documento", 30) }),
  email: z.string().email().max(140, { message: limitMessage("Email", 140) }),
  phone: z.string().max(20, { message: limitMessage("Telefone", 20) }),
});
type Assignor = z.infer<typeof formSchema>;

/**
 * @todo create request to check if email exists after user typed on the form.
 */
export default function Page() {
  const router = useRouter();
  const form = useForm<Assignor>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      document: '',
      email: '',
      phone: ''
    },
  });

  async function onSubmit(
    assignor: Assignor,
    e?: React.BaseSyntheticEvent<object, any, any>,
  ) {
    e?.preventDefault();
    try {
      const res = await apiCall({
        endpoint: '/integrations/assignors',
        method: 'POST',
        body: assignor,
      });
      if (res.redirect) {
        router.push(res.redirect);
      } else if (res.result) {
        router.push(`/cedentes/${res.result.id}`);
      }
    } catch (err: any) {
      console.error(err); // TODO: add toaster or other message;
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-between p-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Cedentes</CardTitle>
              <CardDescription>
                Cadastrar cedentes.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="document">Documento</FormLabel>
                      <FormControl>
                        <Input id="document" autoFocus {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input id="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="phone">Telefone</FormLabel>
                      <FormControl>
                        <Input id="phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Nome</FormLabel>
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit">Salvar cedente</Button>
            </CardFooter>
          </Card>
        </ form >
      </ Form >
    </div>
  );
}
