"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import PayableCard from "./payable-card";

type PayablesListProps = {
  payables: {
    id: string;
    amount: number;
    emissionDate: string;
  }[];
};

export async function PayableList(props: PayablesListProps) {
  return (
    <div className="flex flex-col items-end mx-auto">
      <Button className="mb-5">Cadastrar novo pagável</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href={`payables/f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f`}>
          <PayableCard
            payable={{ amount: 1000, emissionDate: "25/10/2024", id: "f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f" }}
          />
        </Link>
        <Link href={`payables/f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f`}>
          <PayableCard
            payable={{ amount: 1000, emissionDate: "25/10/2024", id: "f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f" }}
          />
        </Link>
        <Link href={`payables/f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f`}>
          <PayableCard
            payable={{ amount: 1000, emissionDate: "25/10/2024", id: "f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f" }}
          />
        </Link>
        <Link href={`payables/f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f`}>
          <PayableCard
            payable={{ amount: 1000, emissionDate: "25/10/2024", id: "f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f" }}
          />
        </Link>
        <Link href={`payables/f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f`}>
          <PayableCard
            payable={{ amount: 1000, emissionDate: "25/10/2024", id: "f6f8c8d8-6e54-4b02-8f18-7c6f3e6e3f5f" }}
          />
        </Link>
      </div>
    </div>
  );
}
