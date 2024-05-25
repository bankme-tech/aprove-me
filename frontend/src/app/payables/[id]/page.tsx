"use client"

import useCheckToken from "@/app/hooks/useCheckToken";
import useGetPayableById from "@/app/hooks/useGetPayableById";
import Link from "next/link";

export default function PayableDetails({ params }: { params: { id: string } }) {
    useCheckToken();
    const { data: payable, isLoading } = useGetPayableById(params.id);
  return (
    <div>
        <h2>{payable?.id}</h2>
        <p>{payable?.value}</p>
        <p>{payable?.emissionDate}</p>
        <Link href={`/assignor/${payable?.assignorId}`}>{payable?.assignorId}</Link>
    </div>
  )
}
