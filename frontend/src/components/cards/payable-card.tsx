import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PayableForm } from "../forms/payable-form";
import { useAssignor } from "@/context/assignor/use-assignor";
import { useQuery } from "@tanstack/react-query";
import { usePayable } from "@/context/payable/use-payable";
import { UpdatePayableInputDTO } from "@/@core/domain/dtos/payable.dto";
import { useState } from "react";

interface PayableCardProps extends React.ComponentProps<typeof Card> {
  className?: string;
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
}

export function PayableCard({ className, ...props }: PayableCardProps) {
  const { getAllAssignors } = useAssignor();
  const { status, data } = useQuery({
    queryKey: ["assignors"],
    queryFn: getAllAssignors,
  });

  const { updatePayable, deletePayable } = usePayable();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cardValue, setCardValue] = useState(props.value);
  const [cardEmissionDate, setCardEmissionDate] = useState(props.emissionDate);
  const [cardAssignorId, setCardAssignorId] = useState(props.assignorId);

  const handleEditSubmit = async (values: UpdatePayableInputDTO) => {
    await updatePayable(props.id, values);
    setCardValue(values.value);
    setCardEmissionDate(values.emissionDate);
    setCardAssignorId(values.assignorId);
    setIsDialogOpen(false);
  };

  const handleDelete = async () => {
    await deletePayable(props.id);
  };

  if (status === "pending") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Carregando...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Erro</p>
      </main>
    );
  }

  const { id, value, emissionDate, assignorId, ...restProps } = props;
  return (
    <Card className={cn("w-auto", className)} {...restProps}>
      <CardHeader>
        <CardTitle> Detalhes do Recebível </CardTitle>
        <CardDescription>
          Visualize as informações completas do seu recebível.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              ID do recebível
            </p>
            <p className="text-base font-semibold text-primary">{id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Valor</p>
            <p className="text-base font-semibold text-primary">
              R$ {cardValue.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Data de emissão
            </p>
            <p className="text-base font-semibold text-primary">
              {cardEmissionDate.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              ID do cedente
            </p>
            <p className="text-base font-semibold text-primary">
              <Link
                className="font-extrabold text-bankmeBlue hover:underline"
                href={`/assignors/${cardAssignorId}`}
              >
                {cardAssignorId}
              </Link>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-5 justify-evenly">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "outline",
            className: "w-fit ",
          })}
        >
          Voltar
        </Link>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            className={buttonVariants({
              variant: "bankme",
              className: "w-fit opacity-65 hover:bg-blue-700",
            })}
          >
            Editar
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Recebível</DialogTitle>
              <DialogDescription>
                Altere as informações do recebível conforme necessário.
              </DialogDescription>
            </DialogHeader>
            <PayableForm
              onSubmit={handleEditSubmit}
              assignors={data}
              defaultValues={{
                value: value,
                emissionDate: emissionDate,
                assignorId: assignorId,
              }}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
        <Link href={"/"}>
          <Button
            className={buttonVariants({
              variant: "destructive",
              className: "w-fit opacity-80",
            })}
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
