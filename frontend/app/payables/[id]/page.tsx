import { api } from '@/app/api/axios';
import PayableCard from '@/app/components/payables/PayableCard';

import { Payable } from '@/app/page';
import React from 'react'

export default async function PayableId({ params }: { params: { id: string } }) {


  async function getPayable() {
    try {
      api.defaults.headers['authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Yjc1MzRlMi02NzUxLTRkNGUtYjIwNy03NWJlZDllYTQ2NTIiLCJlbWFpbCI6InRlc3RlQGdhaWwuY29tIiwiaWF0IjoxNzE2NDEyNTk0LCJleHAiOjE3MTY0MTYxOTR9.FfseyiazPepuSAgNgO07xRMV4kMovQWfXbkh_viwiBs'
      const { data } = await api.get(`integrations/payable/${params.id}`)
      return data
    } catch (error) {
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