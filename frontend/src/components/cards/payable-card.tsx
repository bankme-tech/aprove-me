import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface PayableCardProps extends React.ComponentProps<typeof Card> {
  className?: string;
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
}

export function PayableCard({ className, ...props }: PayableCardProps) {
  const { id, value, emissionDate, assignorId, ...restProps } = props;
  return (
    <Card className={cn("w-auto", className)} {...restProps}>
      <CardHeader>
        <CardTitle> Recebível cadastrado!</CardTitle>
        <CardDescription>Confira os detalhes abaixo.</CardDescription>
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
              R$ {value.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Data de emissão
            </p>
            <p className="text-base font-semibold text-primary">
              {emissionDate.toLocaleDateString("pt-BR", {
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
            <p className="text-base font-semibold text-primary">{assignorId}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "bankme",
            className: "w-fit ",
          })}
        >
          Cadastrar outro recebível
        </Link>
      </CardFooter>
    </Card>
  );
}
