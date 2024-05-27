import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { DatePicker } from "../ui/date-picker";
import CurrencyInput from "../ui/currency-input";
import { Input } from "../ui/input";

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
}

export function PayableForm({ onSubmit }: PayableFormProps) {
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
        <FormField
          control={form.control}
          name="assignorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID do cedente</FormLabel>
              <FormControl>
                <Input
                  placeholder="123e4567-e89b-12d3-a456-426655440000"
                  {...field}
                />
              </FormControl>
              <FormDescription>Identificador único do cedente</FormDescription>
              <FormMessage />
            </FormItem>
          )}
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
