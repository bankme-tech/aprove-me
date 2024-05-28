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
import { useState } from "react";
import { UpdateAssignorInputDTO } from "@/@core/domain/dtos/assignor.dto";
import { AssignorForm } from "../forms/assignor-form";
import { useAssignor } from "@/context/assignor/use-assignor";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";

interface AssignorCardProps extends React.ComponentProps<typeof Card> {
  className?: string;
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
}

export function AssignorCard({ className, ...props }: AssignorCardProps) {
  const { updateAssignor, deleteAssignor } = useAssignor();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false); // State for AlertDialog

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cardDocument, setDocument] = useState(props.document);
  const [cardEmail, setEmail] = useState(props.email);
  const [cardPhone, setPhone] = useState(props.phone);
  const [cardName, setName] = useState(props.name);
  const router = useRouter();

  const handleEditSubmit = async (values: UpdateAssignorInputDTO) => {
    await updateAssignor(props.id, values);
    setDocument(values.document);
    setEmail(values.email);
    setPhone(values.phone);
    setName(values.name);
    setIsDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteAssignor(props.id);
      router.push("/");
    } catch (error) {
      setIsAlertDialogOpen(true);
    }
  };

  const { id, document, email, name, phone, ...restProps } = props;
  return (
    <Card className={cn("w-auto", className)} {...restProps}>
      <CardHeader>
        <CardTitle> Detalhes do Cedente </CardTitle>
        <CardDescription>
          Visualize as informações completas do cedente.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              ID do cedente
            </p>
            <p className="text-base font-semibold text-primary">{id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Documento
            </p>
            <p className="text-base font-semibold text-primary">
              {cardDocument}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-base font-semibold text-primary">{cardEmail}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Nome</p>
            <p className="text-base font-semibold text-primary">{cardName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Telefone
            </p>
            <p className="text-base font-semibold text-primary">{cardPhone}</p>
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
              <DialogTitle>Editar Cedente</DialogTitle>
              <DialogDescription>
                Altere as informações do cedente conforme necessário.
              </DialogDescription>
            </DialogHeader>
            <AssignorForm
              onSubmit={handleEditSubmit}
              defaultValues={{
                document,
                email,
                phone,
                name,
              }}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
        <Button
          className={buttonVariants({
            variant: "destructive",
            className: "w-fit opacity-80",
          })}
          onClick={handleDelete}
        >
          Excluir
        </Button>
        <AlertDialog
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <span></span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Erro ao excluir cedente</AlertDialogTitle>
              <AlertDialogDescription>
                Não foi possível excluir o cedente. Esse cedente possui
                recebíveis associados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>
                Fechar
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
