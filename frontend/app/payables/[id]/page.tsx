import { api } from '@/app/api/axios';
import PayableCard from '@/app/components/payables/PayableCard';

import { Payable } from '@/app/page';
import React from 'react';
import toast from 'react-hot-toast';

export default async function PayableId({
  params
}: {
  params: { id: string };
}) {
  async function getPayable() {
    try {
      const { data } = await api.get(`integrations/payable/${params.id}`);
      return data;
    } catch (error) {
      toast.error('Error fetching payable');
    }
  }

  const payable: Payable = await getPayable();

  return (
    <main className="h-[100vh] w-full flex justify-center items-center ">
      <PayableCard payable={payable} isDetails />
    </main>
  );
}
