"use client";

import { useSearchParams } from "next/navigation";
import { usePayableOne } from "../hooks/usePayableOne";

const PayableShowMore = () => {
  const searchParams = useSearchParams();

  const { payable } = usePayableOne(searchParams.get("id") as string);

  return (
    <section>
      <div className="p-4 w-full">
        <p className="ext-lg font-semibold">Cedente</p>
        <p>{payable.assignorId}</p>
      </div>
      <div className="flex flex-col gap-y-4 bg-gray-200 p-4 w-full md:flex-row md:gap-x-14  rounded-bl-lg rounded-br-lg">
        <div className="flex-1">
          <p className="text-lg font-semibold">Valor</p>
          <p>{payable.value}</p>
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold">Dt. de Emissão</p>
          <p>{payable.emissionDate}</p>
        </div>
      </div>
    </section>
  );
};

export default PayableShowMore;
