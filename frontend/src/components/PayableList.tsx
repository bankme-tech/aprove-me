import Link from "next/link";
import { Payable } from "@/types/Payable";
import CardRow from "./CardRow";

import axiosInstance from "@/api/axiosInstance";
import { convertToCurrency } from "@/lib/utils";

export async function PayableList() {
  const { data } = await axiosInstance.get<Payable[]>('payable');

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      {data.map((payable) => (
        <div key={payable.id} className="flex flex-col border-blue-500 border-2 rounded-xl p-3 gap-4">
          <div className="flex flex-col gap-2">
            <CardRow label="ID" data={payable.id} />
            <CardRow label="Value" data={convertToCurrency(payable.value)} />
            <CardRow
              label="Emission Data"
              data={new Date(payable.emissionDate).toDateString()} />
          </div>
          <Link
            href={`/payable/${payable.id}`}
            className="bg-blue-500 text-white p-2 rounded-md text-center"
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  )
}
