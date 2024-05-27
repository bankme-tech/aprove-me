"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
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
import React, { useEffect } from "react";

import { useRouter } from 'next/navigation'
import { currencyToNumber, floatToCurrency, numberToCurrency } from "@/lib/format-currency";
import { Combobox, ComboboxProps } from "@/components/combobox";
import { Slot } from "@radix-ui/react-slot";
import { apiCall } from "@/lib/api-call";
import { AssignorEntity } from "@/interfaces/assignor.interface";
import { PayableEntity, type PayableDto } from "@/interfaces/payable.interface";

const formSchema = z.object({
  value: z.string().optional(),
  emissionDate: z.string().optional(),
  assignor: z.string().uuid().optional(),
});
type PayableSchema = z.infer<typeof formSchema>;

interface Props {
  id: string;
  payable?: Required<PayableEntity>;
}
export default function EditPayableForm(p: Props) {
  const [assignors, setAssignors] = React.useState<AssignorEntity[]>([]);
  const form = useForm<PayableSchema>({ resolver: zodResolver(formSchema) });
  const router = useRouter();

  function loadAssignors() {
    apiCall({
      endpoint: `/integrations/assignors`,
      method: "GET",
    }).then((res) => {
      setAssignors(res.result.assignors);
    });
  }

  useEffect(() => {
    if (p.payable?.value) {
      const currency = floatToCurrency(p.payable.value);
      form.setValue('value', currency);
    }
    if (p.payable?.emissionDate) {
      form.setValue('emissionDate', p.payable.emissionDate);
    }
    if (p.payable?.assignorId) {
      form.setValue('assignor', p.payable.assignorId);
    }
  }, [
    p.id,
  ]);

  useEffect(() => {
    loadAssignors();
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitOnly = e.target.value.replace(/\D/g, '');
    const currency = numberToCurrency(digitOnly);
    form.setValue("value", currency);
  }

  async function onSubmit(
    payable: PayableSchema,
    e?: React.BaseSyntheticEvent<object, any, any>,
  ) {
    e?.preventDefault();
    const dto: Omit<Partial<PayableDto>, 'id'> = {
      ...payable,
      value: payable.value ? currencyToNumber(payable.value) : undefined,
      emissionDate: payable.emissionDate
        ? new Date(payable.emissionDate).toISOString()
        : undefined,
    }
    try {
      await apiCall({
        endpoint: `/integrations/payable/${p.id}`,
        method: 'PATCH',
        body: dto,
      });
      router.back();
    } catch (err: any) {
      console.log(err); // TODO: add toaster or other message;
    }
  }

  function buildComboboxValue(assignor?: Partial<AssignorEntity>): ComboboxProps['items'][number] {
    if (!assignor || !assignor.name && !assignor.email) {
      return { key: '', label: '' };
    }
    if (assignor.name && !assignor.email) {
      return { key: assignor.name.toLowerCase(), label: assignor.name };
    }
    if (assignor.email && !assignor.name) {
      return { key: assignor.email, label: assignor.email };
    }
    const label = `${assignor.name} - Email: ${assignor.email}`;
    return { key: label.toLowerCase(), label };
  }
  function onComboboxSelect(key: string) {
    const assignorFound = assignors.find((a) => key === buildComboboxValue(a).key);
    if (assignorFound) form.setValue('assignor', assignorFound.id);
  }

  function countDefined(payable?: PayableEntity) {
    return Number(!!payable?.value) +
      Number(!!payable?.emissionDate) +
      Number(!!payable?.assignor?.name);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Atualizar Pagável</CardTitle>
            <CardDescription>
              Adicione os valores que devem ser atualizados.
              {countDefined(p?.payable) > 1 ?
                <div>
                  <br /><strong>Valores atuais:</strong>
                  <ul>
                    {p.payable?.value ? <li>- Valor {p.payable.value}</li> : null}
                    {p.payable?.emissionDate ? <li>- Data: de emissão {p.payable.emissionDate}</li> : null}
                    {p.payable?.assignor.name ? <li>- Cedentes: {p.payable.assignor.name}</li> : null}
                  </ul>
                </div>
                : null
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="assignor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="assignor" className="block">Cedente</FormLabel>
                  <Slot>
                    <Combobox
                      pickLabel="Escolha cedente..."
                      searchLabel="Digite nome do cedente"
                      notFoundLabel="Cedente não encontrado"
                      items={assignors.map((a) => buildComboboxValue(a))}
                      onSelect={onComboboxSelect}
                      initialKey={buildComboboxValue(p.payable?.assignor).key}
                    />
                  </Slot>
                  <input id="value" type="hidden" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-1">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="value">Valor do pagável</FormLabel>
                    <FormControl>
                      <Input
                        id="value"
                        autoFocus
                        {...field}
                        onChange={onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="emissionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="emissionDate">Data de emissão</FormLabel>
                    <FormControl>
                      <Input id="emissionDate" type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit">Salvar mudançar</Button>
          </CardFooter>
        </Card>
      </ form>
    </ Form>
  );
}
