"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreatePayable } from "@/hooks/useCreatePayable";
import { useListAssignor } from "@/hooks/useListAssignor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  value: z.string({
    required_error: "Valor não pode ser vazio",
  }),
  assignor: z.string({
    required_error: "Valor não pode ser vazio",
  }),
});

export default function Page() {
  const { assignors } = useListAssignor();
  const { createPayable } = useCreatePayable();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      assignor: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const payload = {
      value: parseFloat(values.value),
      assignor: values.assignor,
    };
    console.log("Payload do Form:", payload);
    try {
      const response = await createPayable(payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
            Cadastre um Pagável
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o valor da nota"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assinante</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o assinante" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {assignors?.map((assignor: any) => (
                          <SelectItem value={assignor.id} key={assignor.id}>
                            {assignor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
