'use client';
import axiosInstance from "@/api/axiosInstance"
import CardRow from "@/components/CardRow"
import { Payable } from "@/types/Payable"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function PayableDetailsPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Payable | null>(null)

  useEffect(() => {
    const fetchPayable = async () => {
      const { data } = await axiosInstance.get<Payable>(`payable/${params.id}`)
      setData(data)
    };

    fetchPayable();
  })
  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen"
    >
      <div className="border-2 border-blue-500 p-4 flex flex-col gap-4">
        <h1 className="text-3xl">Payable Details</h1>
        {data && (
          <main className="flex flex-col gap-4">
            <CardRow label="ID" data={data?.id} />
            <CardRow label="Value" data={data?.value} />
            <CardRow label="Emission Date" data={data?.emissionDate} />
            <CardRow label="Assignor" data={data?.assignorId} />
            <Link
              href={`/assignor/${data.assignorId}`}
              className="bg-blue-500 text-white p-2 rounded-md text-center"
            >
              Assignor Details
            </Link>
          </main>
        )}
      </div>
    </div>
  )
}
