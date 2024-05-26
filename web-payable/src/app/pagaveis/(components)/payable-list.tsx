"use client";

import { Pencil1Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { numberToCurrency } from "@/lib/format-currency"
import React from "react";
import { apiCall } from "@/lib/api-call";
import { Pagination } from "@/interfaces/pagination.interface";
import { PayableEntity } from "@/interfaces/payable.interface";
import { AlertModalButton } from "@/components/alert-modal";

interface PayableListItem {
  id: string;
  value: string;
  emissionDate: string;
  // assignorId: string;
  // assignorName: string;
}

type CardProps = React.ComponentProps<typeof Card>;

/**
 * @todo pagination.
 * @todo edit item.
 */
export default function PayableList({ className, ...props }: CardProps) {
  const [payableItems, setPayableItems] = React.useState<PayableListItem[]>();
  const selectKeys: (keyof PayableEntity)[] = ['id', 'value', 'emissionDate'];

  React.useEffect(() => {
    apiCall<Pagination<Required<PayableEntity>>>({
      endpoint: `/integrations/payable?selectKeys=${selectKeys.join(',')}`,
      method: "GET",
    }).then((res) => {
      if (res.result?.items) {
        const payableListItems: PayableListItem[] = res.result.items.map((payable) => ({
          id: payable.id,
          value: numberToCurrency(payable.value),
          emissionDate: new Intl.DateTimeFormat("pt-BR", {
            timeStyle: "medium",
            dateStyle: "short",
            hourCycle: "h24",
          }).format(new Date(payable.emissionDate)),
          // assignorId: payable.assignorId,
          // assignorName: payable.assignor.name,
        }));
        setPayableItems(payableListItems);
      }
    });
  }, []);

  function onDeleteConfirmation(id: string) {
    apiCall<{ deleted: PayableEntity }>({
      endpoint: `/integrations/payable/${id}`,
      method: "DELETE",
    }).then((res) => {
      if (res.result?.deleted && payableItems) {
        setPayableItems(payableItems.filter(obj => obj.id !== id));
      }
    });
  }

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Lista de pagáveis</CardTitle>
        <CardDescription>
          Procure a lista de pagáveis. Caso queira cria um pagável novo aperte "Criar pagável".
          <Button className="w-full mt-3" asChild>
            <Link href="/pagaveis/criar">
              <PlusIcon className="mr-2 h-4 w-4" />
              Criar pagável.
            </Link>
          </Button>
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {payableItems?.map((payable, index) => (
          <div
            key={index}
            className="mb-4 grid grid-cols-[1fr_94px] items-center pb-4 last:mb-0 last:pb-0"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Data de emissão: {payable.emissionDate}
              </p>
              <p className="text-sm text-muted-foreground">
                Valor: {payable.value}
              </p>
            </div>

            <div className="flex bg-c">
              <Button className="bg-blue-600 text-white shadow-sm hover:bg-blue-500" asChild>
                <Link href={`/pagaveis/${payable.id}`}>
                  <Pencil1Icon />
                </Link>
              </Button>

              <AlertModalButton
                label={<TrashIcon />}
                title="Por favor confirme antes de apagar."
                message={`Esta operação é permanente. 
                  Deseja apagar pagável com valor de ${payable.value}?`}
                confirmMessage="Remover permanentemente"
                id={payable.id}
                onConfirm={onDeleteConfirmation}
                buttonsClassName="bg-destructive text-destructive-foreground shadow-sm hover:bg-red-700"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
