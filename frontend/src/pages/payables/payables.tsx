import { Button } from "@/components/ui/button";
import { PayablesTable } from "@/pages/payables/components/payablesTable";

export const Payables = () => {
  return (
    <main className="p-4 pt-20">
      <div className="flex justify-between w-full mb-2">
        <h1 className="text-4xl text-primary font-bold">Lista pagáveis</h1>

        <Button>Adicionar pagável</Button>
      </div>
      <PayablesTable />
    </main>
  );
};
