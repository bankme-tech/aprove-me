import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";

type PayableCardProps = {
  payable: {
    amount: number;
    id: string;
    emissionDate: string;
  };
};

export default function PayableCard({ payable }: PayableCardProps) {
  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>R${payable.amount}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{payable.id}</p>
      </CardContent>
      <CardFooter>
        <p>Data de emissão {payable.emissionDate}</p>
      </CardFooter>
    </Card>
  );
}
