"use client";

import { Button } from "@/components/atoms/Button";
import { Dialog } from "@/components/organisms/Dialog";
import { FormPayable } from "@/components/organisms/FormPayable";
import { Table } from "@/components/organisms/Table";
import { useRouter } from "next/navigation";

const Payable = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex w-2/3 justify-between gap-12 mb-8">
        <Dialog
          label="Criar pagavéis"
          title="Pagavéis"
          confirm="Cadastrar"
          cancel="Cancelar"
          router={router}
        >
          <FormPayable />
        </Dialog>
        <Button label="Importar pagavéis" />
      </div>
      <Table></Table>
    </>
  );
};

export default Payable;
