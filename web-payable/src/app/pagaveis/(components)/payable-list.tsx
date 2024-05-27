"use client";

import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { floatToCurrency } from "@/lib/format-currency"
import { useEffect, useState } from "react";
import { apiCall } from "@/lib/api-call";
import { Pagination } from "@/interfaces/pagination.interface";
import { PayableEntity } from "@/interfaces/payable.interface";
import PayableCardItem from "./payable-card-item";

export interface PayableListItem {
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
  const [payableItems, setPayableItems] = useState<PayableListItem[]>();

  useEffect(() => {
    const selectKeys: (keyof PayableEntity)[] = ['id', 'value', 'emissionDate'];
    apiCall<Pagination<Required<PayableEntity>>>({
      endpoint: `/integrations/payable?selectKeys=${selectKeys.join(',')}`,
      method: "GET",
    }).then((res) => {
      if (res.result?.items) {
        const payableListItems: PayableListItem[] = res.result.items.map((payable) => ({
          id: payable.id,
          value: floatToCurrency(payable.value),
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
          Procure a lista de pagáveis. Caso queira criar um pagável novo aperte &quot;Criar pagável&quot;.
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
          <PayableCardItem
            index={index}
            key={index}
            payable={payable}
            onDeleteConfirmation={onDeleteConfirmation}
          />
        ))}
      </CardContent>
    </Card>
  );
}
