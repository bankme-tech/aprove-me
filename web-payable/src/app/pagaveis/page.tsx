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
import { numberToCurrency } from "@/lib/format-currency";


const formSchema = z.object({
  value: z.string({ message: "Por favor digite um valor positivo" }),
  emissionDate: z.string(),
  assignor: z.string().uuid(),
});
const DEV_TEST = "7ce5d0a8-153e-4c18-be0a-68c4928a9573";

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "R$ 0",
      emissionDate: new Date().toISOString(),
      assignor: DEV_TEST,
    },
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitOnly = e.target.value.replace(/\D/g, '');
    const currency = numberToCurrency(digitOnly);
    form.setValue("value", currency);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((value, e) => {
            e?.preventDefault();
            console.log(`[Log:values]:`, value);

          })}
          className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Pagável</CardTitle>
              <CardDescription>
                Cadastrar pagável.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
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
              <Button type="submit">Save changes</Button>
            </CardFooter>
          </Card>
        </ form >
      </ Form >
    </div>
  );
}
