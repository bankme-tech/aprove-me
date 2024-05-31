"use client";
import { useSearchParams } from "next/navigation";

const PayableDelete = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  return (
    <section className="p-4">
      <h1 className="text-2xl mb-2">Deseja realmente excluir o pagável:</h1>
      <p className="text-primary-dark">{id}</p>
    </section>
  );
};

export default PayableDelete;
