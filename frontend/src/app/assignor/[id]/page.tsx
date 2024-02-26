'use client';
import axiosInstance from "@/api/axiosInstance"
import CardRow from "@/components/CardRow"
import { Assignor } from "@/types/Assignor"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function AssignorDetailsPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Assignor | null>(null)

  useEffect(() => {
    const fetchAssignor = async () => {
      const { data } = await axiosInstance.get<Assignor>(`assignor/${params.id}`)
      setData(data);
    }

    fetchAssignor();
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen"
    >
      <div className="border-2 border-blue-500 p-4 flex flex-col gap-4">
        <h1 className="text-3xl">Payable Details</h1>
        {data && (
          <main className="flex flex-col gap-4">
            <CardRow label="ID" data={data.id} />
            <CardRow label="Name" data={data.name} />
            <CardRow label="Document" data={data.document} />
            <CardRow label="Email" data={data.email} />
            <CardRow label="Phone" data={data.phone} />
          </main>
        )}
        <Link
          href={`/assignor/${params.id}/edit`}
          className="bg-blue-500 text-white p-2 rounded-md text-center"
        >
          Edit
        </Link>
        <Link
          href={`/`}
          className="bg-gray-500 text-white p-2 rounded-md text-center"
        >
          Home
        </Link>
      </div>
    </div>
  )
}
