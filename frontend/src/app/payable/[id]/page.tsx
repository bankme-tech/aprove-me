'use client';


import { api } from "@/api/api";
import { Payable } from "@/interfaces/interfaces";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link"
import { useEffect, useState } from "react";


interface PayableDetailsProps {
    params: {
        id: string
    }
}

export default function PayableDetails({params}: PayableDetailsProps) {
  const [data, setData] = useState<Payable | null>(null)

  useEffect(() => {
    const fetchPayable = async () => {
      const { data } = await api.get<Payable>(`payable/${params.id}`)
      setData(data)
    };

    fetchPayable();
  }, [params.id])

  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen"
    >
      <div className="border rounded-md border-white p-4 flex flex-col items-center gap-2">
        <div className="w-full flex justify-between">
            <Link  href={'/'}>
                <ArrowLeft size={24} className="text-blue-500 hover:text-blue-400 cursor-pointer" />
            </Link>
            <h1 className="text-3xl mb-8 font-bold">Payable Details</h1>
            <div>
            </div>
        </div>
        {data && (
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-4"> 

                <h1 >ID: {data?.id}</h1>
                <h2 className="text-2xl font-semibold">Value: {formatCurrency(data?.value)}</h2>

                <time
                dateTime={data?.emissionDate}
                >
                Emission Date: {new Date(data?.emissionDate).toLocaleDateString()}
                </time>
            </div>
            <Link
            href={`/assignor/${data.assignorId}`}
            className="text-blue-500 underline hover:text-blue-400 mt-4"
            >
               Assignor Details
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
