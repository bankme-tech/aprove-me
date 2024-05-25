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
import { currencyToNumber, numberToCurrency } from "@/lib/format-currency";
import { Combobox } from "@/components/combobox";
import { useRouter } from "next/navigation";
import { Slot } from "@radix-ui/react-slot";
import { apiCall } from "@/lib/api-call";

const formSchema = z.object({
  value: z.string({ message: "Por favor digite um valor positivo" }),
  emissionDate: z.string(),
  assignor: z.string().uuid(),
});

type Payable = z.infer<typeof formSchema>;
export default function Page() {
  const router = useRouter();
  const form = useForm<Payable>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "R$ 0",
      emissionDate: new Date().toISOString(),
      assignor: "",
    },
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitOnly = e.target.value.replace(/\D/g, '');
    const currency = numberToCurrency(digitOnly);
    form.setValue("value", currency);
  }

  const items = [
    { value: "09661545-54f1-4d3b-92c3-066332ff2c22", label: "UUID" },
    { value: "invalid 1", label: "invalid 1" },
    { value: "invalid 2", label: "invalid 2" },
    { value: "invalid 3", label: "invalid 3" },
  ];

  async function onSubmit(
    payable: Payable,
    e?: React.BaseSyntheticEvent<object, any, any>,
  ) {
    e?.preventDefault();
    const dto: Payable | { value: number } = {
      ...payable,
      value: currencyToNumber(payable.value),
      emissionDate: new Date(payable.emissionDate).toISOString(),
    }

    try {
      const res = await apiCall({
        endpoint: '/integrations/payable',
        method: 'POST',
        body: dto,
      });
      if (res.redirect) {
        router.push(res.redirect);
      } else if (res.result) {
        router.push(`/pagaveis/${res.result.id}`);
      }
    } catch (err: any) {
      console.log(err); // TODO: add toaster o other message;
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
              <CardTitle className="text-center">Pagável</CardTitle>
              <CardDescription>
                Cadastrar pagável.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="assignor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="assignor" className="block">Cedente</FormLabel>
                    <Slot>
                      <Combobox
                        pickLabel="Escolha cedente..."
                        searchLabel="Digite nome do cedente"
                        notFoundLabel="Cedente não encontrado"
                        items={items}
                        onSelect={(value) => { form.setValue('assignor', value) }}
                      />
                    </Slot>
                    <input id="value" type="hidden" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="value">Valor do pagável</FormLabel>
                      <FormControl>
                        <Input
                          id="value"
                          autoFocus
                          {...field}
                          onChange={onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="emissionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="emissionDate">Data de emissão</FormLabel>
                      <FormControl>
                        <Input id="emissionDate" type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit">Salvar pagável</Button>
            </CardFooter>
          </Card>
        </ form >
      </ Form >
    </div>
  );
}
