"use client";

import { PayableForm, payableSchema } from "@/components/forms/payable-form";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreatePayableInputDTO } from "@/@core/domain/dtos/payable.dto";
import { usePayable } from "@/context/payable/use-payable";
import { useAssignor } from "@/context/assignor/use-assignor";

export default function CreatePayable() {
  const router = useRouter();
  const { createPayable } = usePayable();
  const { getAllAssignors } = useAssignor();
  const { status, data } = useQuery({
    queryKey: ["assignors"],
    queryFn: getAllAssignors,
  });
  const { mutate } = useMutation({
    mutationFn: createPayable,
    onSuccess: (response) => {
      router.push(`/payables/${response.id}`);
    },
  });

  const handleSubmit = async (data: CreatePayableInputDTO) => {
    const formData = payableSchema.safeParse(data);
    if (formData.success) {
      mutate(formData.data);
    }
  };

  if (status === "pending") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Carregando...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Erro</p>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md ">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Cadastrar recebível
        </h1>
        <PayableForm onSubmit={handleSubmit} assignors={data} />
      </div>
    </main>
  );
}
