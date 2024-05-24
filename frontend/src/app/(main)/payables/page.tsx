'use client';
import toast from 'react-hot-toast';
import { api } from '../../../api/axios';
import PayableCard from '../../../components/payables/PayableCard';
import { Payable } from '@/types/PayableType';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

export default function Payables() {
  const [payables, setPayables] = useState<Payable[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getPayables() {
      try {
        const { data } = await api.get(`integrations/payable`);
        setPayables(data);
      } catch (error) {
        toast.error('Error getting payable');
        if (((error as AxiosError)?.response?.status) === 401) {
          toast.error('Session expired')
          router.push('/signIn')
        }
      }
    }
    getPayables();
  }, [router]);

  return (
    <>
      <h1 className="text-white font-bold text-3xl mt-4">Payables</h1>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-4">
        {payables?.map((payable) => (
          <PayableCard key={payable.id} setPayables={setPayables} initialPayable={payable} />
        ))}
      </div>
    </>
  );
}
