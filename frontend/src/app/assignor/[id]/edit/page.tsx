'use client';
import editAssignor from "@/actions/editAssignorAction";
import axiosInstance from "@/api/axiosInstance";
import CardRow from "@/components/CardRow";
import { Assignor } from "@/types/Assignor";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
}

export default function EditAssignorPage({ params }: { params: { id: string } }) {
  const [state, formAction] = useFormState(editAssignor, initialState)
  const [data, setData] = useState<Assignor | null>(null)

  useEffect(() => {
    const fetchAssignor = async () => {
      const { data } = await axiosInstance.get<Assignor>(`assignor/${params.id}`);
      setData(data);
    }

    fetchAssignor();
  });



  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen"
    >
      <div className="border-2 border-blue-500 p-4 flex flex-col gap-4">
        <h1 className="text-3xl">Payable Details</h1>
        <CardRow label="ID" data={params.id} />
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <input type="text" name="id" value={params.id} className="hidden" />
            <label className="text-xl font-bold" htmlFor="">Name</label>
            <input
              type="text" name="name" id="name" defaultValue={data?.name}
              className="text-black border-2 border-blue-500 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl font-bold" htmlFor="document">Document</label>
            <input
              type="text" name="document" id="document" defaultValue={data?.document}
              className="text-black border-2 border-blue-500 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl font-bold" htmlFor="email">Email</label>
            <input type="text" name="email" id="email" defaultValue={data?.email}
              className="text-black border-2 border-blue-500 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl font-bold" htmlFor="phone">Phone</label>
            <input type="text" name="phone" id="phone" defaultValue={data?.phone}
              className="text-black border-2 border-blue-500 p-2 rounded-md"
            />
          </div>
          <p>{state?.message}</p>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md text-center"
          >
            Submit
          </button>
          <Link
            href={`/assignor/${params.id}`}
            className="bg-gray-500 text-white p-2 rounded-md text-center"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  )
}
function readToken(arg0: string) {
  throw new Error("Function not implemented.");
}

