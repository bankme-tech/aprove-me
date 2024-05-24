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


const POSIVITE_NUMBER_MSG = "Por favor digite um valor positivo";
const formSchema = z.object({
  value: z.coerce
    .number({ message: POSIVITE_NUMBER_MSG })
    .min(0, { message: POSIVITE_NUMBER_MSG }),
  emissionDate: z.string(),
  // emissionDate: z.string().datetime(),
  assignor: z.string().uuid(),
});
const DEV_TEST = "7ce5d0a8-153e-4c18-be0a-68c4928a9573";

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: undefined,
      emissionDate: new Date().toISOString(),
      assignor: DEV_TEST,
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((value, e) => {
          e?.preventDefault();
          console.log(`[Log:values]:`, value);

        })} className="space-y-8">
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
                      <FormLabel htmlFor="username">Valor do pagável</FormLabel>
                      <FormControl>
                        <Input id="username" autoFocus type="number" {...field} />
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
