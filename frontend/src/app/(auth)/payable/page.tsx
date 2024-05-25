"use client";

import { Button } from "@/components/atoms/Button";
import { Table } from "@/components/organisms/Table";
import { useRouter } from "next/navigation";
import { usePayable } from "./hooks/usePayable";

export const Payable = () => {
  const { deferredPayable } = usePayable();

  const router = useRouter();

  const header = [
    { key: "id", value: "id" },
    { key: "value", value: "Valor" },
    { key: "emissionDate", value: "Dt. de Emissão" },
  ];

  return (
    <>
      <div className="flex w-1/3 justify-between gap-12 mb-8 ">
        <Button onClick={() => router.push("/payable/register")}>
          {" "}
          Pagavéis
        </Button>
        <Button> Importar pagavéis</Button>
      </div>
      <Table
        headerContent={header}
        bodyContent={deferredPayable}
        linkToEdit="/payable/edit"
      ></Table>
    </>
  );
};

const PayablePage = () => {
  return <></>;
};
export default PayablePage;
