import { useFormState, useFormStatus } from "react-dom";
import { createPayable } from "../actions/postPayableAction";
import axiosInstance from "@/api/axiosInstance";
import { Assignor } from "@/types/Assignor";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  message: null
}

export default function CreatePayableForm() {
  const [state, formAction] = useFormState(createPayable, initialState);
  const [data, setData] = useState<Assignor[]>([])
  const [fetching, setFetching] = useState(false)
  const { pending } = useFormStatus();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchAssignors = async () => {
      setFetching(true)
      const { data } = await axiosInstance.get<Assignor[]>('assignor')
      setData(data)
      setFetching(false)
    }

    fetchAssignors()
  }, [])


  return (
    <div className="flex flex-col items-center gap-2 border-2 border-blue-500 rounded-xl p-4">
      <h1 className="text-3xl font-bold">Create Payable</h1>
      <form
        ref={ref}
        className="flex flex-col gap-3"
        action={(formData: FormData) => {
          formAction(formData);
          ref.current?.reset()
          router.refresh()
        }}
      >
        <div className="flex flex-col">
          <label>Value</label>
          <input
            type="number"
            name="value"
            className="text-black border-2 border-blue-500 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col" >
          <label>Assignor</label>
          <select
            name="assignorId"
            id="assignorId"
            className="text-black border-2 border-blue-500 p-2 rounded-md"
          >
            {fetching ? <option>Loading...</option> :
              data?.map((assignor) => (
                <option key={assignor.id} value={assignor.id}>
                  {assignor.name}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500"
          aria-disabled={pending}
        >
          Create Payable
        </button>
        <p>{state?.message}</p>
      </form>
    </div >
  );
}

