"use client";

import { PayableForm, payableSchema } from "@/components/forms/payable-form";
import { usePayable } from "@/context/use-payable";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function Home() {
  const router = useRouter();
  const { createPayable } = usePayable();

  const handleSubmit = async (data: z.infer<typeof payableSchema>) => {
    const payable = await createPayable({
      value: data.value,
      emissionDate: data.emissionDate,
      assignorId: data.assignorId,
    });
    router.push(`/payables/${payable.id}`);
  };

  return (
    <main className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md ">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Cadastrar recebível
        </h1>
        <PayableForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
