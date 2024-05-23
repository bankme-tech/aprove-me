"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useFindAssignor } from "@/hooks/useFindAssignor";
import { ArrowBigLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { assignor } = useFindAssignor(id);
  console.log(assignor);

  return (
    <main className="p-5 h-full flex justify-center">
      <div className="flex gap-5 flex-col items-center bg-white w-[50%] h-[350px] p-8 rounded-xl">
        <h1 className="text-2xl font-bold">Detalhes do Pagável</h1>
        <div className="flex gap-3">
          <span className="font-bold">ID:</span>
          <span className="font-normal">{id}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold">Nome:</span>
          <span className="font-normal">{assignor?.name}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold">Email:</span>
          <span className="font-normal">{assignor?.email}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold">Telefone:</span>
          <span className="font-normal">{assignor?.phone}</span>
        </div>
        <div>
          <Link href="/list-payable">
            <Button className="flex gap-2 bg-[#0a36b0]">
              <ArrowBigLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
