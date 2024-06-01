"use client";
import { DialogFooter } from "@/components/molecules/DialogFooter";
import { deleteOnePayable } from "@/services";
import { useRouter, useSearchParams } from "next/navigation";

const PayableDelete = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") as string;

  const route = useRouter();

  return (
    <section className="p-4">
      <h1 className="text-2xl mb-2">Deseja realmente excluir o pagável:</h1>
      <p className="text-primary-dark">{id}</p>
      <DialogFooter
        confirm="Excluir"
        onConfirm={async () => {
          await deleteOnePayable(id);
          route.back();
        }}
        goBack={() => route.back()}
      />
    </section>
  );
};

export default PayableDelete;
