import { Suspense } from "react";
import { NewAssignor } from "./(components)/new-assignor";
import { TableListAssignors } from "./(components)/table-list-assignors";

export default function Assignors() {
  return (
    <div className="space-y-2">
        <section className="flex flex-row justify-between">
            <h1 className="text-lg">Cedentes</h1>
            <NewAssignor />
        </section>

        <TableListAssignors />
    </div>
  );
}
