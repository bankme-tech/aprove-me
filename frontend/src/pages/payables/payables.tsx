import { PayablesTable } from "@/pages/payables/components/payablesTable";
import { AddAssignorDialog } from "@/pages/payables/components/addAssignorDialog/addAssignorDialog";
import { AddPayableDialog } from "@/pages/payables/components/addPayableDialog/addPayableDialog";

export const Payables = () => {
  return (
    <main className="p-8 pt-16">
      <div className="flex justify-between w-full mb-2">
        <h1 className="text-title text-primary font-bold">Lista de pagáveis</h1>

        <div className="gap-2 flex items-center flex-col md:flex-row">
          <AddPayableDialog />
          <AddAssignorDialog />
        </div>
      </div>

      <PayablesTable />
    </main>
  );
};
