import { AssignorEntity } from "@/interfaces/assignor.interface";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react";
import { AlertModalButton } from "@/components/alert-modal";

interface Props {
  index: number
  assignor: AssignorEntity;
  onDeleteConfirmation: (id: string) => void;
}
export function AssignorCardItem(p: Props) {
  const { index, assignor, onDeleteConfirmation } = p;
  return (
    <div
      key={index}
      className="mb-4 grid grid-cols-[1fr_94px] items-center pb-4 last:mb-0 last:pb-0"
    >
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">
          Nome: {assignor.name}
        </p>
        <p className="text-sm text-muted-foreground">
          Email: {assignor.email}
        </p>
        <p className="text-sm text-muted-foreground">
          Telefone: {assignor.phone}
        </p>
      </div>

      <div className="flex bg-c">
        <Button className="bg-blue-600 text-white shadow-sm hover:bg-blue-500" asChild>
          <Link href={`/cedentes/${assignor.id}`}>
            <Pencil1Icon />
          </Link>
        </Button>

        <AlertModalButton
          label={<TrashIcon />}
          title="Por favor confirme antes de apagar."
          message={`Esta operação é permanente. 
                  Deseja apagar cedente com nome de ${assignor.name}?`}
          confirmMessage="Remover permanentemente"
          id={assignor.id}
          onConfirm={onDeleteConfirmation}
          buttonsClassName="bg-destructive text-destructive-foreground shadow-sm hover:bg-red-700"
        />
      </div>
    </div>
  );
}
