"use client";

import { AssignorEntity } from "@/interfaces/assignor.interface";
import { apiCall } from "@/lib/api-call";
import { useEffect, useState } from "react";
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
import React from "react";
import { AlertModalButton } from "@/components/alert-modal";

type CardProps = React.ComponentProps<typeof Card>;
export default function AssignorList({ className, ...props }: CardProps) {
  const [assignors, setAssignors] = useState<AssignorEntity[]>();

  useEffect(() => {
    apiCall<{ assignors: AssignorEntity[] }>({
      endpoint: "/integrations/assignors",
      method: "GET"
    }).then((res) => {
      console.log(`[Log:res.result]:`, res.result);
      setAssignors(res.result.assignors);
    });
  }, []);

  function onDeleteConfirmation(id: string) {
    apiCall<{ deleted: AssignorEntity }>({
      endpoint: `/integrations/assignors/${id}`,
      method: "DELETE",
    }).then((res) => {
      if (res.result?.deleted && assignors) {
        setAssignors(assignors.filter(obj => obj.id !== id));
      }
    });
  }

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Lista de cedentes</CardTitle>
        <CardDescription>
          Procure a lista de cedentes. Caso queira criar um cedente novo aperte "Criar cedente".
          <Button className="w-full mt-3" asChild>
            <Link href="/cedentes/criar">
              <PlusIcon className="mr-2 h-4 w-4" />
              Criar cedente.
            </Link>
          </Button>
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {assignors?.map((assignor, index) => (
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
        ))}
      </CardContent>
    </Card>
  );
}
