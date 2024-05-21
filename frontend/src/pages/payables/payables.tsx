import { Button } from "@/components/ui/button";
import { PayablesTable } from "@/pages/payables/components/payablesTable";
import { AddAssignorDialog } from "@/pages/payables/components/addAssignorDialog/addAssignorDialog";

export const Payables = () => {
  return (
    <main className="p-4 pt-20">
      <div className="flex justify-between w-full mb-2">
        <h1 className="text-title text-primary font-bold">Lista de pagáveis</h1>

        <div className="gap-2 flex items-center flex-col md:flex-row">
          <Button>Adicionar pagável</Button>
          <AddAssignorDialog />
        </div>
      </div>

      <PayablesTable />
    </main>
  );
};
