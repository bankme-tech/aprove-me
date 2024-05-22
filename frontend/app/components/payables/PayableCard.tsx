import { Payable } from '@/app/page'
import Link from 'next/link'
import React from 'react'
import CardInfo from './CardInfo'
import { api } from '@/app/api/axios'

export default function PayableCard({ payable, isDetails }: { payable: Payable, isDetails?: boolean }) {

  const formatDate = () => {
    const date = new Date(payable?.emissionDate)
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    const formattedDate = dateFormatter.format(date);

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    const formattedTime = timeFormatter.format(date);

    return `${formattedDate} ${formattedTime}`;
  }

  const handleDelete = async () => {
    try {
      await api.delete(`integrations/payable/${payable.id}`)
      alert('Payable deleted successfully')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`bg-neutral-50 w-[90%] max-w-[${isDetails ? '600' : '500'}px] flex flex-col gap-2 sm:gap-4 p-4 sm:p-6 rounded-lg relative`}>
      <div className='absolute flex gap-2 right-2'>
        <button className='bg-slate-800 text-white rounded-md p-1'></button>
        <button className='bg-red-500 text-white rounded-md p-1'>Delete</button>
      </div>
      <h1 className='font-bold text-lg text-center sm:text-2xl md:text-3xl'>Payable</h1>
      <CardInfo label='Id' value={payable?.id} />
      <CardInfo label='Value' value={payable?.value.toFixed(2)} />
      <CardInfo label='Emission Date' value={formatDate()} />
      {isDetails && <CardInfo label='Assignor Id' value={payable?.assignorId} />}

      <Link href={`${isDetails ? `/assignor/${payable?.assignorId}` : `payables/${payable.id}`}`} className='w-full bg-slate-800 rounded-md text-center p-2 sm:text-base md:text-lg text-white'>
        {isDetails ? 'Assignor Details' : 'Payable Details'}
      </Link>


    </div>
  )
}
