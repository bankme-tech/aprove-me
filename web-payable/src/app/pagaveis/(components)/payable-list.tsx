"use client";

import { Pencil1Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
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
import { PayableDto, PayableEntity } from "@/interfaces/payable.interface";

interface PayableListItem {
  payableId: string;
  assignorId: string;
  assignorName: string;
  value: number;
  emissionDate: string;
}

type CardProps = React.ComponentProps<typeof Card>;

/**
 * @todo pagination.
 * @todo delete item.
 * @todo edit item.
 */
export default function PayableList({ className, ...props }: CardProps) {
  const [payableItems, setPayableItems] = React.useState<PayableListItem[]>();

  React.useEffect(() => {
    apiCall<Pagination<Required<PayableEntity>>>({
      endpoint: "/integrations/payable/page?includeAssignor=true",
      method: "GET",
    }).then((res) => {
      console.log(JSON.stringify(res.result, null, 2));
      if (res.result?.items) {
        const payableListItems: PayableListItem[] = res.result.items.map((payable) => ({
          value: payable.value,
          payableId: payable.id,
          emissionDate: payable.emissionDate,
          assignorId: payable.assignorId,
          assignorName: payable.assignor.name,
        }));
        setPayableItems(payableListItems);
      }
    });
  }, []);

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Lista de pagáveis</CardTitle>
        <CardDescription>
          Procure a lista de pagáveis. Caso queira cria um pagável novo aperte "Criar pagável".
          <Button className="w-full mt-3">
            <PlusIcon className="mr-2 h-4 w-4" />
            <Link href="/pagaveis/criar">
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
                {payable.assignorName}
              </p>
              <p className="text-sm text-muted-foreground">
                Valor: {numberToCurrency(payable.value)}
              </p>
              <p className="text-sm text-muted-foreground">
                Data: {payable.emissionDate}
              </p>
            </div>

            <div className="flex bg-c">
              <Button className="bg-blue-600">
                <Link href="#">
                  <Pencil1Icon />
                </Link>
              </Button>
              <Button className="bg-red-700">
                <Link href="#">
                  <TrashIcon />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
