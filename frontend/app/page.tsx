'use client'
import { useEffect, useState } from "react";
import { api } from "./api/axios";
import Input from "./components/ui/Input/Input";
import toast from "react-hot-toast";
import { handleChange } from "./utils/utils";
import { useRouter } from "next/navigation";

export interface Assignor {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
}

export interface Payable {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: string;
}

export default function Home() {

  const initialPayable = {
    id: '',
    value: 0,
    emissionDate: '',
    assignorId: ''
  }

  const [payableInfo, setPayableInfo] = useState<Payable>(initialPayable);
  const [assignors, setAssignors] = useState<Assignor[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getAssignors = async () => {
      try {
        const { data } = await api.get('integrations/assignor');
        setAssignors(data)
      } catch (error) {
        console.error(error);
        setAssignors([])
      }
    }
    getAssignors();
  }, []);


  const handleCreatePayable = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!payableInfo.assignorId || !payableInfo.emissionDate || !payableInfo.value) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const { data } = await api.post('integrations/payable', {
        ...payableInfo, value: Number(payableInfo.value)
      })
      console.log(data)
      router.push(`/payables/${data.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal server error');
    }
  }

  return (
    <main className="h-[100vh] w-full text-white flex justify-center items-center ">
      <div className="bg-neutral-600 w-4/5 max-w-[500px] p-4 rounded-lg flex items-center justify-center">
        <form className="flex flex-col gap-4 text-black w-4/5 items-center justify-center " onSubmit={handleCreatePayable}>
          <label htmlFor="">
            Value
            <input type="number" name="value" onChange={(e) => handleChange(e, setPayableInfo)} />
          </label>
          <label htmlFor="">
            Emission Date
            <input type="date" name="emissionDate" onChange={(e) => handleChange(e, setPayableInfo)} />
          </label>

          <select name="assignorId" onChange={(e) => handleChange(e, setPayableInfo)} className="w-full">
            <option value="">Select an assignor</option>
            {assignors?.map((assignor) => (
              <option key={assignor.id} value={assignor.id}>{assignor.name}</option>
            ))}
          </select>

          <button className="p-2 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-4 rounded-lg md:text-lg w-full">
            Create
          </button>

        </form>
      </div>
    </main>
  );
}
