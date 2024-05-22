import React from 'react'
import { api } from '../api/axios';
import { Payable } from '../page';
import PayableCard from '../components/payables/PayableCard';

export default async function Payables() {

  async function getPayable() {
    try {
      api.defaults.headers['authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Yjc1MzRlMi02NzUxLTRkNGUtYjIwNy03NWJlZDllYTQ2NTIiLCJlbWFpbCI6InRlc3RlQGdhaWwuY29tIiwiaWF0IjoxNzE2NDEyNTk0LCJleHAiOjE3MTY0MTYxOTR9.FfseyiazPepuSAgNgO07xRMV4kMovQWfXbkh_viwiBs'
      const { data } = await api.get(`integrations/payable`)
      return data
    } catch (error) {
      console.error(error);
    }
  }

  const payables: Payable[] = await getPayable();

  return (
    <main className='w-full flex flex-col items-center justify-center gap-4 px-4 sm:px-8 md:px-12 lg:px-18'>
      <h1 className='text-white font-bold text-3xl mt-4'>Payables</h1>
      <div className='flex flex-wrap justify-center gap-2 sm:gap-4 bg-4'>
        {payables?.map((payable) => (
          <PayableCard key={payable.id} payable={payable} />
        ))}
      </div>
    </main>
  )
}
