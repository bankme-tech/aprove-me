import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CurrencyInput from "../ui/currency-input";
import { DatePicker } from "../ui/date-picker";
import { Combobox } from "../ui/combobox";
import Link from "next/link";
import { useAssignor } from "@/context/assignor/use-assignor";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth/use-auth";

export const payableSchema = z.object({
  value: z.coerce
    .number({
      message: "O valor é obrigatório",
    })
    .min(0.01, "O valor deve ser maior que 0"),
  emissionDate: z.date({
    message: "A data de emissão é obrigatória",
  }),
  assignorId: z.string().uuid("O ID do cedente deve ser um UUID válido"),
});

export interface PayableFormProps {
  onSubmit: (values: z.infer<typeof payableSchema>) => void;
  defaultValues?: Partial<z.infer<typeof payableSchema>>;
  isEditing?: boolean;
}

export function PayableForm({
  onSubmit,
  defaultValues,
  isEditing = false,
}: PayableFormProps) {
  const { getAllAssignors } = useAssignor();

  const { isAuth } = useAuth();
  const { status, data: assignors } = useQuery({
    queryKey: ["assignors"],
    queryFn: getAllAssignors,
    enabled: isAuth,
  });

  const form = useForm<z.infer<typeof payableSchema>>({
    resolver: zodResolver(payableSchema),
    defaultValues: {
      value: 0,
      emissionDate: undefined,
      assignorId: "",
      ...defaultValues,
    },
  });

  if (status === "pending") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Carregando...</p>
      </main>
    );
  }

  if (status === "error" || assignors === undefined) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Erro</p>
      </main>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col content-between space-y-8"
      >
        <Combobox
          form={form}
          name="assignorId"
          label="Cedente"
          items={assignors}
          itemToLabel={(assignor) => assignor.name}
          itemToValue={(assignor) => assignor.id}
          description="Cedente do recebível."
        />
        <CurrencyInput
          form={form}
          label="Valor"
          name="value"
          placeholder="R$ 0,00"
        />
        {!isEditing && (
          <FormField
            control={form.control}
            name="emissionDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de emissão</FormLabel>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button className="self-center w-32 bg-bankmeBlue" type="submit">
          {isEditing ? "Salvar" : "Cadastrar"}
        </Button>
        {!isEditing && (
          <Link
            href={"/"}
            className={buttonVariants({
              variant: "outline",
              className:
                "w-fit opacity-75 hover:bg-blue-600 self-center hover:text-white",
            })}
          >
            Voltar
          </Link>
        )}
      </form>
    </Form>
  );
}
