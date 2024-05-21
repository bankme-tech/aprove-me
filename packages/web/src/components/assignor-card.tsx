"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";

export type Assignor = {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
};

type AssignorCardProps = {
  assignor: Assignor;
};

export default function AssignorCard({ assignor }: AssignorCardProps) {
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
