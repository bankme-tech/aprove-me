import { api } from '@/app/api/axios';
import PayableCard from '@/app/components/payables/PayableCard';

import { Payable } from '@/app/page';
import React from 'react'

export default async function PayableId({ params }: { params: { id: string } }) {

  async function getPayable() {
    try {

      const { data } = await api.get(`integrations/payable/${params.id}`)
      console.log('entrou try')
      return data
    } catch (error) {
      console.log('entrou catch')
      console.error(error);
    }
  }


  const payable: Payable = await getPayable();

  return (
    <main className='h-[100vh] w-full flex justify-center items-center '>
      <PayableCard payable={payable} isDetails />
    </main>
  )
}