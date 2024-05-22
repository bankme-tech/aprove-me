"use client";

import { z } from "zod";
import { AxiosError } from "axios";
import { axiosInstance } from "@/api/api";
import { useForm } from "react-hook-form";
import { Assignor } from "./assignor-card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import createPayable from "@/api/createPayable";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  value: z.coerce.number().min(1),
  assignorId: z.string(),
});

export function CreatePayableForm() {
  const router = useRouter();
  const [isFetching, setFetching] = useState(true);
  const [assignors, setAssignors] = useState<Assignor[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
      assignorId: "",
    },
  });

  useEffect(() => {
    const fetchAssignors = async () => {
      const { data } = await axiosInstance.get<Assignor[]>("/assignor");
      setAssignors(data);
      setFetching(false);
    };

    fetchAssignors();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createPayable(values);

      router.back();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setFormError("Algo deu errado");
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-w-80 max-w-80 mt-5 mx-auto">
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cedente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cedente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isFetching ? (
                    <SelectItem value="Carregando...">Carregando...</SelectItem>
                  ) : (
                    assignors.map((assignor) => (
                      <SelectItem value={assignor.id} key={assignor.id}>
                        {assignor.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {formError && <p className="text-red-500">{formError}</p>}
        <div className="flex justify-between">
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </Form>
  );
}
