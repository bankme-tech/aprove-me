import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/organisms/Modal";
import { Table } from "@/components/organisms/Table";
const Payable = () => {
  return (
    <>
      <div className="flex w-2/3 justify-between gap-12">
        <Button label="Importar pagavéis" />
        <Modal label="Criar pagavéis" />
      </div>
      <Table></Table>
    </>
  );
};

export default Payable;
