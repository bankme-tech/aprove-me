"use client";

import { Payable } from "@/@core/domain/entities/payable.entity";
import { PayableCard } from "@/components/cards/payable-card";
import { usePayable } from "@/context/use-payable";
import { useEffect, useState } from "react";

export default function CreatedPayable({ params }: { params: { id: string } }) {
  const { getPayable } = usePayable();
  const [payable, setPayable] = useState<Payable | null>(null);

  useEffect(() => {
    const fetchPayable = async () => {
      const payable = await getPayable(params.id);
      setPayable(payable);
    };
    fetchPayable();
  }, [params.id, getPayable]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen ">
      <PayableCard
        id={payable ? payable.id : Math.random().toString(36).substring(7)}
        value={payable ? payable.value : Math.random() * 1000}
        emissionDate={payable ? payable.emissionDate : new Date()}
        assignorId={
          payable ? payable.assignorId : Math.random().toString(36).substring(7)
        }
      />
    </main>
  );
}
