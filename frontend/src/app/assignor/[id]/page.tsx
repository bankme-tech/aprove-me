'use client';


import { api } from "@/api/api";
import { Assignor } from "@/interfaces/interfaces";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link"
import { useEffect, useState } from "react";


interface AssignorDetailsProps {
    params: {
        id: string
    }
}

export default function AssignorDetails({params}: AssignorDetailsProps) {
  const [data, setData] = useState<Assignor | null>(null)

  useEffect(() => {
    const fetchAssignor = async () => {
      const { data } = await api.get<Assignor>(`assignor/${params.id}`)
      setData(data)
    };

    fetchAssignor();
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
            <h1 className="text-3xl mb-8 font-bold">Assignor Details</h1>
            <Link
                href={`/assignor/${params.id}/edit`}
                className="text-blue-500 underline hover:text-blue-400"
                >
                Edit
            </Link>
        </div>
        {data && (
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-4"> 

                <p>ID: {data?.id}</p>
                <p>Document: {data?.document}</p>
                <p>Name: {data?.name}</p>
                <p>Email: {data?.email}</p>
                <p>Phone: {data?.phone}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
