import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

export const assignorSchema = z.object({
  document: z
    .string()
    .min(1, "O documento é obrigatório")
    .max(30, "O documento deve ter no máximo 30 caracteres"),
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("O email é inválido")
    .max(140, "O email deve ter no máximo 140 caracteres"),
  phone: z
    .string()
    .min(1, "O telefone é obrigatório")
    .max(20, "O telefone deve ter no máximo 20 caracteres"),
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(140, "O nome deve ter no máximo 140 caracteres"),
});

export interface AssignorFormProps {
  onSubmit: (values: z.infer<typeof assignorSchema>) => void;
}

export function AssignorForm({ onSubmit }: AssignorFormProps) {
  const form = useForm<z.infer<typeof assignorSchema>>({
    resolver: zodResolver(assignorSchema),
    defaultValues: {
      document: "",
      email: "",
      phone: "",
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col content-between space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="João da Silva" {...field} />
              </FormControl>
              <FormDescription>Nome do cedente</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documento</FormLabel>
              <FormControl>
                <Input placeholder="12345678901" {...field} />
              </FormControl>
              <FormDescription>Documento do cedente</FormDescription>
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
                <Input placeholder="joao@email.com" {...field} />
              </FormControl>
              <FormDescription>Email do cedente</FormDescription>
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
                <Input placeholder="(31) 98320-0261" {...field} />
              </FormControl>
              <FormDescription>Telefone do cedente</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-bankmeBlue" type="submit">
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
