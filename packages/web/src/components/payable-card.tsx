"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";

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
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>R${payable.value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{payable.id}</p>
      </CardContent>
      <CardFooter>
        <p>Data de emissão {new Date(payable.emissionDate).toLocaleDateString("pt-br")}</p>
      </CardFooter>
    </Card>
  );
}
