import { TableBody } from "../molecules/TableBody";
import { TableHeader } from "../molecules/TableHeader";

type Table = {};

export const Table = () => {
  return (
    <div className="max-w-2xl mx-auto ">
      <div className="flex flex-col ">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full rounded-lg divide-y divide-primary-dark table-fixed">
                <TableHeader />
                <TableBody />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
