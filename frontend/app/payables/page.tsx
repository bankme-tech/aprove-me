import React from 'react';
import { api } from '../api/axios';
import { Payable } from '../page';
import PayableCard from '../components/payables/PayableCard';
import toast from 'react-hot-toast';

export default async function Payables() {
  async function getPayable() {
    try {
      const { data } = await api.get(`integrations/payable`);
      return data;
    } catch (error) {
      toast.error('Error fetching payables');
      console.error(error);
    }
  }

  const payables: Payable[] = await getPayable();

  return (
    <main className="w-full flex flex-col items-center justify-center gap-4 px-4 sm:px-8 md:px-12 lg:px-18">
      <h1 className="text-white font-bold text-3xl mt-4">Payables</h1>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-4">
        {payables?.map((payable) => (
          <PayableCard key={payable.id} payable={payable} />
        ))}
      </div>
    </main>
  );
}
