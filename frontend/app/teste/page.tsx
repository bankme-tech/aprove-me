'use client'
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleChange } from "../utils/utils";

export interface Assignor {
  id?: string;
  document: string;
  email: string;
  phone: string;
  name: string;
}

export default function AssignorForm() {

  const initialAssignor = {
    name: '',
    document: '',
    email: '',
    phone: ''
  }

  const [assignorInfo, setAssignorInfo] = useState<Assignor>(initialAssignor);


  const router = useRouter();

  const handleCreatePayable = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!assignorInfo.document || !assignorInfo.email || !assignorInfo.name || !assignorInfo.phone) {
      console.log(assignorInfo)
      toast.error('Please fill all fields');
      return;
    }

    try {
      const { data } = await api.post('integrations/assignor', {
        ...assignorInfo
      })
      router.push(`/assignor/${data.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal server error');
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleChange(e, setAssignorInfo)
  }

  return (
    <main className="h-[100vh] w-full text-white flex justify-center items-center ">
      <div className="bg-neutral-600 w-4/5 max-w-[500px] p-4 rounded-lg flex items-center justify-center">
        <form className="flex flex-col gap-4 text-black w-4/5 items-center justify-center " onSubmit={handleCreatePayable}>
          <label htmlFor="">
            name
            <input type="text" name="name" onChange={handleFormChange} />
          </label>
          <label htmlFor="">
            document
            <input type="text" name="document" onChange={handleFormChange} />
          </label>
          <label htmlFor="">
            email
            <input type="email" name="email" onChange={handleFormChange} />
          </label>
          <label htmlFor="">
            phone
            <input type="tel" name="phone" onChange={handleFormChange} />
          </label>

          <button className="p-2 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-4 rounded-lg md:text-lg w-full">
            Create
          </button>

        </form>
      </div>
    </main>
  );
}
