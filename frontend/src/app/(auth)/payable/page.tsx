import { Button } from "@/components/atoms/Button";
import { FormAssignor } from "@/components/organisms/FormAssignor";
import { Modal } from "@/components/organisms/Modal";
import { Table } from "@/components/organisms/Table";
const Payable = () => {
  return (
    <>
      <div className="flex w-2/3 justify-between gap-12">
        <Modal
          label="Criar pagavéis"
          title="Pagavéis"
          confirm="Cadastrar"
          cancel="Cancelar"
        >
          <FormAssignor />
        </Modal>
        <Button label="Importar pagavéis" />
      </div>
      <Table></Table>
    </>
  );
};

export default Payable;
