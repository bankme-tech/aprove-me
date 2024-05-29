"use client";

import { PayableForm, payableSchema } from "@/components/forms/payable-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CreatePayableInputDTO } from "@/@core/domain/dtos/payable.dto";
import { usePayable } from "@/context/payable/use-payable";
import withAuth from "@/components/with-auth";

const CreatePayable = () => {
  const router = useRouter();
  const { createPayable } = usePayable();

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
};

export default withAuth(CreatePayable);
