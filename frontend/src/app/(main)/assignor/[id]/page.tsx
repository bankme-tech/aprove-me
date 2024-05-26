'use client';
import { api } from '@/api/axios';
import CardInfo from '@/components/payables/CardInfo';
import { Assignor } from '@/types/AssignorType';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AssignorDetails({
  params
}: {
  params: { id: string };
}) {
  const [assignor, setAssignor] = useState<Assignor>({} as Assignor);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function getAssignor() {
      try {
        const { data } = await api.get(`integrations/assignor/${params.id}`);
        setAssignor(data);
        setLoading(false);
      } catch (error) {
        toast.error('Error getting assignor');
        if (((error as AxiosError)?.response?.status) === 401) {
          toast.error('Session expired')
          router.push('/signIn')
        }
      }
      setLoading(false);
    }

    getAssignor();
  }, [params.id, router]);

  const formatPhone = (phone: string) => {
    if (!phone) return '';
    return `(${phone.slice(0, 2)}) ${phone.slice(2, phone.length - 1)}`;
  };

  const formatCpfOrCnpj = (document: string) => {
    if (!document) return '';

    if (document.length === 11) {
      return `${document.slice(0, 3)}.${document.slice(3, 6)}.${document.slice(6, 9)}-${document.slice(9, 11)}`;
    } else {
      return `${document.slice(0, 2)}.${document.slice(2, 5)}.${document.slice(5, 8)}/${document.slice(8, 12)}-${document.slice(12, 14)}`;
    }
  };

  return (
    <section className="w-full flex items-center justify-center">
      {!loading && (
        <div className="bg-neutral-50 w-[90%] max-w-[600px] flex flex-col gap-2 sm:gap-4 p-4 sm:p-6 rounded-lg relative">
          <h1 className="font-bold text-lg text-center sm:text-2xl md:text-3xl">
            Payable
          </h1>
          <CardInfo label="Id" value={assignor?.id as string} />
          <CardInfo
            label="Document"
            value={formatCpfOrCnpj(assignor?.document)}
          />
          <CardInfo label="Email" value={assignor?.email} />
          <CardInfo label="Name" value={assignor?.name} />
          <CardInfo label="Phone" value={formatPhone(assignor?.phone)} />
        </div>
      )}
    </section>
  );
}
