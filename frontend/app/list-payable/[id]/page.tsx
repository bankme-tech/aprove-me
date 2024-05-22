"use client";

import { useParams } from "next/navigation";
import { useFindPayable } from "@/hooks/useFindPayable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { payable } = useFindPayable(id);
  console.log(payable);

  return (
    <main className="p-5 h-full flex justify-center">
      <div className="flex gap-5 flex-col items-center bg-white w-[50%] h-[350px] p-8 rounded-xl">
        <h1 className="text-2xl font-bold">Detalhes do Pagável</h1>
        <div className="flex gap-3">
          <span className="font-bold">ID:</span>
          <span className="font-normal">{id}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold">Data de emissão:</span>
          <span className="font-normal">{payable?.emissionDate}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold">ID do Assinante:</span>
          <span className="font-normal">{payable?.assignor}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold">Valor:</span>
          <span className="font-normal">{payable?.value}</span>
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
