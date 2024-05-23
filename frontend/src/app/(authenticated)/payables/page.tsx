import { NewPayable } from "./(components)/new-payable";
import { TableListPayables } from "./(components)/table-list-payable";

export default function Payables() {
  return (
    <div className="space-y-2">
        <section className="flex flex-row justify-between">
            <h1 className="text-lg">Pagáveis</h1>
            <NewPayable />
        </section>

        <TableListPayables />
    </div>
  );
}
