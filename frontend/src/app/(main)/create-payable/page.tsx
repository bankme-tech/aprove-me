'use client'
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api } from "../../../api/axios";
import PayableForm from "../../../components/payables/PayableForm";
import { Payable } from "@/types/PayableType";



export default function Home() {

  const initialPayable = {
    id: '',
    value: 0,
    emissionDate: new Date(),
    assignorId: ''
  }

  const router = useRouter();

  const handleCreatePayable = async (event: React.FormEvent<HTMLFormElement>, payableInfo: Payable) => {
    event.preventDefault();

    if (!payableInfo.assignorId || !payableInfo.emissionDate || !payableInfo.value) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const { data } = await api.post('integrations/payable', {
        ...payableInfo, value: Number(payableInfo.value)
      })
      router.push(`/payables/${data.id}`);
    } catch (error: unknown) {
      const responseError = error as { response: { data: { message: string } } };
      toast.error(responseError?.response?.data?.message || 'Internal server error');
    }
  }

  return (
    <main className='w-full flex flex-col items-center justify-center gap-4 px-4 sm:px-8 md:px-12 lg:px-18 h-[100vh]'>
      <div
        className={`bg-neutral-50 w-[95%] max-w-[600px] flex flex-col gap-2 sm:gap-4 p-4 sm:p-6 rounded-lg relative `}
      >
        <PayableForm payable={initialPayable} handleForm={handleCreatePayable} />
      </div>
    </main>
  );
}
