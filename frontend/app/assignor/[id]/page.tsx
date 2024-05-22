import { api } from '@/app/api/axios';
import CardInfo from '@/app/components/payables/CardInfo';
import { Assignor } from '@/app/page';
import React from 'react'
import toast from 'react-hot-toast';

export default async function AssignorDetails({ params }: { params: { id: string } }) {

  const getAssignor = async () => {
    try {
      const { data } = await api.get(`integrations/assignor/${params.id}`);
      return data;
    } catch (error) {
      toast.error('Error getting assignor');
    }
  }

  const assignor: Assignor = await getAssignor();

  const formatPhone = (phone: string) => {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, phone.length - 1)}`
  }

  const formatCpfOrCnpj = (document: string) => {
    if (document.length === 11) {
      return `${document.slice(0, 3)}.${document.slice(3, 6)}.${document.slice(6, 9)}-${document.slice(9, 11)}`
    } else {
      return `${document.slice(0, 2)}.${document.slice(2, 5)}.${document.slice(5, 8)}/${document.slice(8, 12)}-${document.slice(12, 14)}`
    }
  }

  return (
    <main className='flex justify-center items-center h-[100vh]'>
      <div className='bg-neutral-50 w-[90%] max-w-[600px] flex flex-col gap-2 sm:gap-4 p-4 sm:p-6 rounded-lg relative'>
        <h1 className="font-bold text-lg text-center sm:text-2xl md:text-3xl">
          Payable
        </h1>
        <CardInfo label="Id" value={assignor?.id} />
        <CardInfo label="Document" value={formatCpfOrCnpj(assignor?.document)} />
        <CardInfo label="Email" value={assignor?.email} />
        <CardInfo label="Name" value={assignor?.name} />
        <CardInfo label="Phone" value={formatPhone(assignor?.phone)} />

      </div>
    </ main>
  )
}
