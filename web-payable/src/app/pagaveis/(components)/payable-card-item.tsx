import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react";
import { AlertModalButton } from "@/components/alert-modal";
import { PayableListItem } from "./payable-list";

interface Props {
  index: number | string;
  payable: PayableListItem;
  onDeleteConfirmation: (id: string) => void;
}
export default function PayableCardItem(p: Props) {
  const { index, payable, onDeleteConfirmation } = p;
  return (
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

  );
}
