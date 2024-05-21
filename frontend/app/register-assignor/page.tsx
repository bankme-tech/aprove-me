"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateAssignor } from "@/hooks/useCreateAssignor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputMask from "react-input-mask";

const formSchema = z.object({
  name: z.string({
    required_error: "Nome não pode ser vazio",
  }),
  document: z.string({
    required_error: "Document não pode ser vazio",
  }),
  email: z.string({
    required_error: "Email não pode ser vazio",
  }),
  phone: z.string({
    required_error: "Telefone não pode ser vazio",
  }),
});

export default function Page() {
  const { createAssignor } = useCreateAssignor();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      document: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await createAssignor(values);
  }

  return (
    <>
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className=" flex flex-col items-center">
          <img
            src="logo-bankme.png"
            alt="Logo"
            className="h-16 w-auto cursor-pointer"
          />
          <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Cadastre-se para poder enviar pagáveis
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Usuário Demo"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF / CNPJ </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 123.456.789-00 | 00.000.000/0000-00"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: usuario.demo@demo.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                     <InputMask
                        mask="(99) 99999-9999"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      >
                        {(inputProps) => <Input {...inputProps} placeholder="Digite seu telefone" />}
                      </InputMask>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-[#0a36b0]" type="submit">
                Cadastrar
              </Button>
            </form>
          </Form>

          <div className="flex items-start flex-col gap-2 mt-2">
            <p className="text-center text-sm text-gray-800">
              Já possui conta?
              <Link
                href="/login"
                className="font-semibold leading-6 text-gray-800 ml-1"
              >
                Faça Login
              </Link>
            </p>
            <Link className="text-sm" href="/">
              Voltar para home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
