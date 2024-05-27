"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { apiCall } from "@/lib/api-call";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { AssignorEntity } from "@/interfaces/assignor.interface";
import { useRouter } from "next/navigation";

function limitMessage(key: string, limit: number) {
  return `${key} com caracteres acima do limite ${limit} caracteres`;
}
const formSchema = z.object({
  name: z.string().max(140, { message: limitMessage("Email", 140) }),
  document: z.coerce
    .string()
    .max(30, { message: limitMessage("Documento", 30) })
    .optional(),
  email: z
    .string()
    .email()
    .max(140, { message: limitMessage("Email", 140) })
    .optional(),
  phone: z
    .string()
    .max(20, { message: limitMessage("Telefone", 20) })
    .optional(),
});
export type AssignorSchema = z.infer<typeof formSchema>;

interface Props {
  id: string;
  assignor?: Required<AssignorEntity>;
}
/**
 * @todo create request to check if email exists after user typed on the form.
 */
export default function EditAssignorForm(p: Props) {
  const form = useForm<AssignorSchema>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  useEffect(() => {
    apiCall({
      endpoint: `/integrations/assignor/${p.id}`,
      method: 'GET',
    }).then((res) => {
      // setAssignor(res.result);
      if (res.result?.name) {
        form.setValue('name', res.result.name);
      }
      if (res.result?.email) {
        form.setValue('email', res.result.email);
      }
      if (res.result?.document) {
        form.setValue('document', res.result.document);
      }
      if (res.result?.phone) {
        form.setValue('phone', res.result.phone);
      }
    });
    // TODO: catch((err) => toaster)
  }, [p.id]);

  async function onSubmit(
    assignor: AssignorSchema,
    e?: React.BaseSyntheticEvent<object, any, any>,
  ) {
    e?.preventDefault();
    try {
      await apiCall({
        endpoint: `/integrations/assignor/${p.id}`,
        method: 'PATCH',
        body: assignor,
      });
      router.back();
    } catch (err: any) {
      console.error(err); // TODO: add toaster or other message;
    }
  }

  function countDefined(assignor?: AssignorEntity) {
    return Number(!!assignor?.document) +
      Number(!!assignor?.email) +
      Number(!!assignor?.name) +
      Number(!!assignor?.phone);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Atualizar Cedentes</CardTitle>
            <CardDescription>
              Adicione os valores que devem ser atualizados.
              {countDefined(p.assignor) > 1 ?
                <div>
                  <br /><strong>Valores atuais:</strong>
                  <ul>
                    {p.assignor?.document ? <li>Documento: {p.assignor.document}</li> : null}
                    {p.assignor?.email ? <li>Email: {p.assignor.email}</li> : null}
                    {p.assignor?.name ? <li>Nome: {p.assignor.name}</li> : null}
                    {p.assignor?.phone ? <li>Telefone: {p.assignor.phone}</li> : null}
                  </ul>
                </div>
                : null
              }
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
            <Button type="submit">Salvar mudanças</Button>
          </CardFooter>
        </Card>
      </ form >
    </ Form >

  );
}
