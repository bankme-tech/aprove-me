'use client';
import { api } from '@/api/axios';
import PayableCard from '@/components/payables/PayableCard';

import { Payable } from '@/types/PayableType';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PayableId({ params }: { params: { id: string } }) {
  const [payable, setPayable] = useState<Payable>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getPayable = async () => {
      try {
        const { data } = await api.get(`integrations/payable/${params.id}`);
        setPayable(data);
        setLoading(false);
      } catch (error) {
        toast.error('Error getting payable');
        if (((error as AxiosError)?.response?.status) === 401) {
          toast.error('Session expired')
          router.push('/signIn')
        }
      }
    };
    getPayable();
  }, [params, router]);

  return (
    <section className=" w-full h-full flex justify-center items-center ">
      {!loading && (
        <PayableCard initialPayable={payable as Payable} isDetails />
      )}
    </section>
  );
}
