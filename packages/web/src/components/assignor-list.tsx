"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import AssignorCard from "./assignor-card";

type AssignorsListProps = {
  assignors: {
    id: string;
    amount: number;
    emissionDate: string;
  }[];
};

export async function AssignorList(props: AssignorsListProps) {
  return (
    <div className="flex flex-col items-end mx-auto">
      <Button className="mb-5">Cadastrar novo cedente</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href={`assignors/f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f`}>
          <AssignorCard
            assignor={{ name: "Caio", document: "123.123.123-24", email: "email@email.com", phone: "(81)12345-1234" }}
          />
        </Link>
        <Link href={`assignors/f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f`}>
          <AssignorCard
            assignor={{ name: "Caio", document: "123.123.123-24", email: "email@email.com", phone: "(81)12345-1234" }}
          />
        </Link>
        <Link href={`assignors/f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f`}>
          <AssignorCard
            assignor={{ name: "Caio", document: "123.123.123-24", email: "email@email.com", phone: "(81)12345-1234" }}
          />
        </Link>
        <Link href={`assignors/f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f`}>
          <AssignorCard
            assignor={{ name: "Caio", document: "123.123.123-24", email: "email@email.com", phone: "(81)12345-1234" }}
          />
        </Link>
        <Link href={`assignors/f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f`}>
          <AssignorCard
            assignor={{ name: "Caio", document: "123.123.123-24", email: "email@email.com", phone: "(81)12345-1234" }}
          />
        </Link>
      </div>
    </div>
  );
}
