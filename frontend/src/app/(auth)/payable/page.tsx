"use client";

import { Button } from "@/components/atoms/Button";
import { Dialog } from "@/components/organisms/Dialog";
import { FormPayable } from "@/components/organisms/FormPayable";
import { Table } from "@/components/organisms/Table";
import { useRouter } from "next/navigation";
import { usePayable } from "./hooks/usePayable";

const Payable = () => {
  const { payable } = usePayable();

  const router = useRouter();

  const header = [
    { key: "id", value: "id" },
    { key: "value", value: "Valor" },
    { key: "emissionDate", value: "Dt. de Emissão" },
  ];

  return (
    <>
      <div className="flex w-1/3 justify-between gap-12 mb-8 ">
        <Dialog
          label="Criar pagavéis"
          title="Pagavéis"
          confirm="Cadastrar"
          cancel="Cancelar"
          router={router}
          dialogForm
        >
          <FormPayable />
        </Dialog>
        <Button> Importar pagavéis</Button>
      </div>
      <Table headerContent={header} bodyContent={payable}></Table>
    </>
  );
};

export default Payable;
