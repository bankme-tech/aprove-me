"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useListPayable } from "@/hooks/useListPayable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdatePayable } from "@/hooks/useUpdatePayable";
import { useDeletePayable } from "@/hooks/useDeletePayable";
const formSchema = z.object({
  value: z.string({
    required_error: "Valor não pode ser vazio",
  }),
  assignor: z.string({
    required_error: "Valor não pode ser vazio",
  }),
});

export default function Page() {
  const { payables } = useListPayable();
  const { updatePayable } = useUpdatePayable();
  const { deletePayable } = useDeletePayable();
  const [selectedPayable, setSelectedPayable] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      assignor: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      value: parseFloat(values.value),
      assignor: values.assignor,
    };
    console.log(body);
    console.log("Id do Payable enviado: ", selectedPayable.id);
    await updatePayable({ body, id: selectedPayable.id });
  }

  function handleEditClick(payable: any) {
    setSelectedPayable(payable);
    form.reset({
      value: payable.value,
      assignor: payable.assignor,
    });
  }

  async function handleDeleteClick(id: any) {
    await deletePayable({id});
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Lista de Pagáveis</h1>
      <Table>
        <TableCaption>LIsta de todos seus pagáveis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Data de emissão</TableHead>
            <TableHead>Id do Assinante</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="text-center">Açoes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payables?.map((payable: any) => (
            <TableRow>
              <TableCell className="font-medium">
                <Link href={`/list-payable/${payable.id}`}>{payable.id}</Link>
              </TableCell>
              <TableCell>{payable.emissionDate}</TableCell>
              <TableCell>{payable.assignor}</TableCell>
              <TableCell className="text-right">${payable.value}</TableCell>
              <TableCell className="flex gap-3 justify-end items-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="bg-[#0a36b0]"
                      onClick={() => handleEditClick(payable)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Editando</AlertDialogTitle>
                    </AlertDialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
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
                              <FormLabel>ID do assinante</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="ID do assinante"
                                  type="text"
                                  disabled
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Enviar</Button>
                      </form>
                    </Form>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  className="bg-[#b00a18]"
                  onClick={() => handleDeleteClick(payable.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
