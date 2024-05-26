'use client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { api } from '../../../api/axios';
import PayableForm from '../../../components/payables/PayableForm';
import { Payable } from '@/types/PayableType';
import { AxiosError } from 'axios';

export default function Home() {
  const initialPayable = {
    id: '',
    value: 0,
    emissionDate: new Date(),
    assignorId: ''
  };

  const router = useRouter();

  const handleCreatePayable = async (
    event: React.FormEvent<HTMLFormElement>,
    payableInfo: Payable
  ) => {
    event.preventDefault();

    if (
      !payableInfo.assignorId ||
      !payableInfo.emissionDate ||
      !payableInfo.value
    ) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const { data } = await api.post('integrations/payable', {
        ...payableInfo,
        value: Number(payableInfo.value)
      });
      router.push(`/payables/${data.id}`);
    } catch (error: unknown) {

      toast.error('Error creating payable');
      if (((error as AxiosError)?.response?.status) === 401) {
        toast.error('Session expired')
        router.push('/signIn')
      }

    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center gap-2 sm:gap-4 p-4 sm:p-6 rounded-xl relative bg-neutral-50 max-w-[600px]">
      <PayableForm
        payable={initialPayable}
        handleForm={handleCreatePayable}
      />
    </section>
  );
}
