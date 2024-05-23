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
      <Table></Table>
    </>
  );
};

export default Payable;
