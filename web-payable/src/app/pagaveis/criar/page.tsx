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
import React, { useEffect } from "react";
import { currencyToNumber, numberToCurrency } from "@/lib/format-currency";
import { Combobox, ComboboxProps } from "@/components/combobox";
import { useRouter } from "next/navigation";
import { Slot } from "@radix-ui/react-slot";
import { apiCall } from "@/lib/api-call";
import { AssignorEntity } from "@/interfaces/assignor.interface";
import { type PayableDto } from "@/interfaces/payable.interface";

const formSchema = z.object({
  value: z.string({ message: "Por favor digite um valor positivo" }),
  emissionDate: z.string().default(new Date().toISOString()),
  assignor: z.string().uuid(),
});
type PayableSchema = z.infer<typeof formSchema>;

export default function Page() {
  const router = useRouter();
  const [assignors, setAssignors] = React.useState<AssignorEntity[]>([]);
  useEffect(() => {
    apiCall({
      endpoint: `/integrations/assignors`,
      method: "GET",
    }).then((res) => setAssignors(res.result.assignors));
  }, [])

  const form = useForm<PayableSchema>({
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

  async function onSubmit(
    payable: PayableSchema,
    e?: React.BaseSyntheticEvent<object, any, any>,
  ) {
    e?.preventDefault();
    const dto: Omit<PayableDto, 'id'> = {
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
      if (res.result) {
        // router.push(`/pagaveis/${res.result.id}`);
        router.back();
      }
    } catch (err: any) {
      console.log(err); // TODO: add toaster or other message;
    }
  }

  function buildComboboxValue(assignor: AssignorEntity): ComboboxProps['items'][number] {
    const label = `${assignor.name} - Email: ${assignor.email}`;
    return { key: label.toLowerCase(), label };
  }
  function onComboboxSelect(key: string) {
    const assignorFound = assignors.find((a) => key === buildComboboxValue(a).key);
    if (assignorFound) form.setValue('assignor', assignorFound.id);
  }

  return (
    <div className="flex min-h-screen flex-col justify-between p-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        items={assignors.map((a) => buildComboboxValue(a))}
                        onSelect={onComboboxSelect}
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
