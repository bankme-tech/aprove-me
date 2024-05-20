import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";

type AssignorCardProps = {
  assignor: {
    name: string
    email: string
    phone: string
    document: string
  }
};

export default function AssignorCard({assignor}: AssignorCardProps) {
  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>{assignor.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{assignor.document}</p>
      </CardContent>
      <CardContent>
        <p>{assignor.email}</p>
      </CardContent>
      <CardFooter>
        <p>{assignor.phone}</p>
      </CardFooter>
    </Card>
  );
}
