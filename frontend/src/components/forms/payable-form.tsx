import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Assignor } from "@/@core/domain/entities/assignor.entity";
import { Combobox } from "../ui/combobox";

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
  assignors: Assignor[];
}

export function PayableForm({ onSubmit, assignors }: PayableFormProps) {
  const form = useForm<z.infer<typeof payableSchema>>({
    resolver: zodResolver(payableSchema),
    defaultValues: {
      value: 0,
      emissionDate: undefined,
      assignorId: "",
    },
  });

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

        <Button className="bg-bankmeBlue" type="submit">
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
