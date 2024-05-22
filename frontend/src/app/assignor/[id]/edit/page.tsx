'use client';

import { api } from "@/api/api";
import EditAssignorForm from "@/components/EditAssignorForm";
import { Assignor } from "@/interfaces/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";



interface EditAssignorProps {
    params: {
        id: string
    }
}

export default function EditAssignor({ params }: EditAssignorProps) {

  const [data, setData] = useState<Assignor | null>(null)

  useEffect(() => {
    const fetchAssignor = async () => {
      const { data } = await api.get<Assignor>(`assignor/${params.id}`);
      setData(data);
    }

    fetchAssignor();
  }, [params.id]);

  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen"
    >
      <div className="border rounded-md border-white p-12 flex flex-col items-center gap-2">
        <h1 className="text-3xl">Edit Assignor</h1>

            {data ? (
                <EditAssignorForm assignor={data} />
                ) : (
                <p>Loading...</p>
            )}



          <Link
            href={`/assignor/${params.id}`}
            className="bg-gray-900 text-white p-2 rounded-md text-center w-full"
          >
            Cancel
          </Link>

      </div>
    </div>
  )
}
function readToken(arg0: string) {
  throw new Error("Function not implemented.");
}

