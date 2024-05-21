import { Button } from "./ui/button";
import PayableCard from "./payable-card";
import getPayables from "@/api/getPayables";

export async function PayableList() {
  const data = await getPayables()

  return (
    <div className="flex flex-col items-end mx-auto">
      <Button className="mb-5">Cadastrar novo pagável</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((payable) => <PayableCard payable={payable} key={payable.id} />)}
      </div>
    </div>
  );
}
