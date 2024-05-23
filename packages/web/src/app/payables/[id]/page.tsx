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
import getPayable from "@/api/getPayable";
import { useForm } from "react-hook-form";
import { WithAuth } from "@/lib/with-auth";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import deletePayable from "@/api/deletePayable";
import { Suspense, useEffect, useState } from "react";
import PayableCard, { Payable } from "@/components/payable-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import updatePayable from "@/api/updatePayable";

type PayablePageProps = {
  params: {
    id: string;
  };
};

const formSchema = z.object({
  value: z.coerce.number(),
});

export default WithAuth(function PayablePage({ params }: PayablePageProps) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [payable, setPayable] = useState<Payable | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: payable?.value || 0,
    },
  });

  useEffect(() => {
    const fetchPayable = async () => {
      const data = await getPayable(params.id);

      setPayable(data);
      setLoading(false);
    };

    fetchPayable();
  }, [params.id]);

  const handleDelete = async () => {
    try {
      const status = await deletePayable(params.id);
      if (status === 204) {
        router.back();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (value: z.infer<typeof formSchema>) => {
    try {
      const { status } = await updatePayable(params.id, value);
      if (status === 200) {
        router.push(`/payables/${params.id}`);
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
            <PayableCard payable={payable!} />
            <Drawer>
              <DrawerTrigger>
                <Button variant="outline" className="mt-5 w-full">
                  Editar
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="w-3/12 mx-auto justify-center">
                  <DrawerTitle>Editar o pagável</DrawerTitle>
                  <DrawerDescription>Altere o valor do pagável</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleUpdate)}
                      className="w-3/12 mx-auto flex flex-col justify-center"
                    >
                      <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <span className="border-t border-l border-b p-[7px] font-bold rounded-l-md">R$</span>{" "}
                                <Input type="number" placeholder="Valor" {...field} />
                              </div>
                            </FormControl>
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
