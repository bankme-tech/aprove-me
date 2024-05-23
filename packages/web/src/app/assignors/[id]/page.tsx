"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { WithAuth } from "@/lib/with-auth";
import getAssignor from "@/api/getAssignor";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useEffect, useState } from "react";
import AssignorCard, { Assignor } from "@/components/assignor-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import deleteAssignor from "@/api/deleteAssignor";
import updateAssignor from "@/api/updateAssignor";

type AssignorPageProps = {
  params: {
    id: string;
  };
};

const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  document: z.string(),
});

export default WithAuth(function AssignorPage({ params }: AssignorPageProps) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [assignor, setAssignor] = useState<Assignor | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: assignor?.name,
      email: assignor?.email,
      phone: assignor?.phone,
      document: assignor?.document,
    },
  });

  useEffect(() => {
    const fetchPayable = async () => {
      const data = await getAssignor(params.id);

      setAssignor(data);
      setLoading(false);
    };

    fetchPayable();
  }, [params.id]);

  const handleDelete = async () => {
    try {
      const status = await deleteAssignor(params.id);
      if (status === 204) {
        router.replace('/assignors');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (value: z.infer<typeof formSchema>) => {
    try {
      const { status } = await updateAssignor(params.id, value);
      if (status === 200) {
        router.replace('/assignors');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col mt-10 w-fit mx-auto">
      <Suspense fallback={<p className="mx-auto mt-20">Carregando...</p>}>
        {isLoading ? (
          <></>
        ) : (
          <>
            <AssignorCard assignor={assignor!} />
            <Drawer>
              <DrawerTrigger>
                <Button variant="outline" className="mt-5 w-full">
                  Editar
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="w-3/12 mx-auto justify-center">
                  <DrawerTitle>Editar cedente</DrawerTitle>
                  <DrawerDescription>Altere os dados do cedente</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleUpdate)}
                      className="w-3/12 mx-auto flex flex-col justify-center space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome" {...field} />
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
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input placeholder="E-mail" type="email" {...field} />
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
                              <Input placeholder="Telefone" {...field} />
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
                            <FormLabel>Documento de identificação</FormLabel>
                            <FormControl>
                              <Input placeholder="Documento de identificação (CPF ou CNPJ)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button className="mt-2">Atualizar</Button>
                    </form>
                  </Form>
                  <DrawerClose className="mt-5 w-3/12 mx-auto justify-center">
                    <Button variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            <Button variant="destructive" onClick={handleDelete} className="mt-5">
              Remover
            </Button>
          </>
        )}
      </Suspense>
    </div>
  );
});
