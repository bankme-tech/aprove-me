import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

export type Payable = {
  id: string;
  value: number;
  emissionDate: string;
};

type PayableCardProps = {
  payable: Payable;
};

export default function PayableCard({ payable }: PayableCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>R$ {payable.value}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`assignor/${payable.id}`}>
          ID do cedente: <Button variant="link">{payable.id}</Button>
        </Link>
      </CardContent>
      <CardFooter>
        <p>Data de emissão {new Date(payable.emissionDate).toLocaleDateString("pt-br")}</p>
      </CardFooter>
    </Card>
  );
}
