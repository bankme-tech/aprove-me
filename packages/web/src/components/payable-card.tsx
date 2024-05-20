import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";

type PayableCardProps = {
  amount: number;
  id: string;
  emissionDate: string;
};

export default function PayableCard(props: PayableCardProps) {
  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>R${props.amount}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{props.id}</p>
      </CardContent>
      <CardFooter>
        <p>Data de emissão {props.emissionDate}</p>
      </CardFooter>
    </Card>
  );
}
