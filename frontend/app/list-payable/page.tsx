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
import { Pencil, Trash2, LogOut, SaveIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdatePayable } from "@/hooks/useUpdatePayable";
import { useDeletePayable } from "@/hooks/useDeletePayable";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

const formSchema = z.object({
  value: z.string({
    required_error: "Valor não pode ser vazio",
  }),
  assignor: z.string({
    required_error: "Valor não pode ser vazio",
  }),
});

export default function Page() {
  const router = useRouter();
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
    await deletePayable({ id });
  }

  function handleLogout() {
    Cookie.remove("user_token");
    router.push("/login");
  }

  return (
    <div className="p-5">
      <div className="flex justify-between mb-10">
        <h1 className="text-2xl font-bold">Lista de Pagáveis</h1>
        <div className="flex gap-8">
          <Link href="/register-payable">
            <Button className="flex gap-2 bg-[#0a36b0]">
              Cadastrar Pagável
              <SaveIcon className="mr-2 h-4 w-4" />
            </Button>
          </Link>

          <Button className="flex gap-2 bg-[#b00a0a]" onClick={handleLogout}>
            Logout
            <LogOut className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <Table>
        <TableCaption>LIsta de todos seus pagáveis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead>Data de emissão</TableHead>
            <TableHead>Assinante</TableHead>
            <TableHead className="text-center">Açoes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payables?.map((payable: any) => (
            <TableRow>
              <TableCell className="font-medium">
                <Link href={`/list-payable/${payable.id}`}>{payable.id}</Link>
              </TableCell>
              <TableCell className="text-right">${payable.value}</TableCell>
              <TableCell>{payable.emissionDate}</TableCell>
              <TableCell>
                <Link
                  href={
                    payable.assignor ? `/assignor/${payable?.assignor}` : ""
                  }
                >
                  <span className="font-normal">Ver assinante</span>
                </Link>
              </TableCell>
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

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-[#b00a18]">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Tem certeza que deseja fazer isto?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação é irreversível e apagará seu registro do banco
                        de dados.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteClick(payable.id)}
                        className="bg-[#b00a18]"
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
