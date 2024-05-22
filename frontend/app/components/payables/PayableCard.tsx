'use client';

import { Assignor, Payable } from '@/app/page';
import Link from 'next/link';
import React, { useState } from 'react';
import CardInfo from './CardInfo';
import { api } from '@/app/api/axios';
import { Edit, Trash, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handleChange } from '@/app/utils/utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function PayableCard({
  payable,
  isDetails
}: {
  payable: Payable;
  isDetails?: boolean;
}) {

  const initialDate = new Date(payable?.emissionDate) as unknown as string;

  const [isEditing, setIsEditing] = useState(false);
  const [payableInfo, setPayableInfo] = useState<Payable>({ ...payable, emissionDate: initialDate });
  const [assignors, setAssignors] = useState<Assignor[]>([]);

  const router = useRouter();

  const formatDate = () => {
    const date = new Date(payable?.emissionDate);
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    const formattedDate = dateFormatter.format(date);

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    const formattedTime = timeFormatter.format(date);

    return `${formattedDate} ${formattedTime}`;
  };

  const handleDelete = async () => {
    try {
      await api.delete(`integrations/payable/${payable.id}`);
      toast.success('Payable deleted successfully');
      router.push('/payables');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async () => {
    setIsEditing(true);

    console.log(payable, 'pay')
    console.log(payableInfo, 'infop')


    try {
      const { data } = await api.get('integrations/assignor');
      setAssignors(data);
      await api.get(`integrations/payable/${payable.id}`);
    } catch (error) {
      ('aa');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleChange(e, setPayableInfo);
  }

  const handleDateChange = (date: Date) => {
    setPayableInfo({ ...payableInfo, emissionDate: date as unknown as string });
  };

  const handleFormEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!payableInfo.value || !payableInfo.emissionDate || !payableInfo.assignorId) {
      toast.error('Fill all fields');
      return;
    }

    try {

      await api.patch(`integrations/payable/${payable.id}`, { ...payableInfo, value: Number(payableInfo.value) });
      toast.success('Payable updated successfully');
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error('Error updating payable');
    }
  }

  return (
    <div
      className={`bg-neutral-50 w-[95%] max-w-[${isDetails ? '600' : '500'}px] flex flex-col gap-2 sm:gap-4 p-4 sm:p-6 rounded-lg relative ${isEditing && 'justify-center items-center'}`}
    >
      {isEditing ? (
        <form className="flex flex-col gap-4 text-black w-4/5 items-center justify-center " onSubmit={handleFormEdit}>
          <label htmlFor="">
            Value
            <input
              type="number"
              name="value"
              value={payableInfo.value}
              onChange={handleFormChange}
            />
          </label>
          <label htmlFor="">
            Emission Date
            <DatePicker
              selected={payableInfo.emissionDate as unknown as Date}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MM/dd/yyyy h:mm aa" // Formato de data e hora desejado
              className="form-control" // Adicione classes CSS conforme necessário
            />
          </label>

          <select
            name="assignorId"
            defaultValue={payableInfo.assignorId}
            onChange={handleFormChange}
            className="w-full"
          >
            {assignors?.map((assignor) => (
              <option key={assignor.id} value={assignor.id}>
                {assignor.name}
              </option>
            ))}
          </select>

          <button className='bg-slate-800 text-white rounded-md p-[2px] sm:p-1 absolute top-4 right-4 sm:right-6'>
            <X />
          </button>

          <button className="p-2 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-4 rounded-lg md:text-lg w-full">
            Update
          </button>
        </form>
      ) : (
        <>
          <div className="absolute flex gap-2 right-4 sm:right-6">
            <button
              onClick={handleEdit}
              className="bg-slate-800 text-white rounded-md p-[2px] sm:p-1"
            >
              <Edit />
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white rounded-md p-[2px] sm:p-1"
            >
              <Trash />
            </button>
          </div>
          <h1 className="font-bold text-lg text-center sm:text-2xl md:text-3xl">
            Payable
          </h1>
          <CardInfo label="Id" value={payable?.id} />
          <CardInfo label="Value" value={payable?.value.toFixed(2)} />
          <CardInfo label="Emission Date" value={formatDate()} />
          {isDetails && (
            <CardInfo label="Assignor Id" value={payable?.assignorId} />
          )}

          <Link
            href={`${isDetails ? `/assignor/${payable?.assignorId}` : `payables/${payable.id}`}`}
            className="w-full bg-slate-800 rounded-md text-center p-2 sm:text-base md:text-lg text-white"
          >
            {isDetails ? 'Assignor Details' : 'Payable Details'}
          </Link>
        </>
      )}
    </div>
  );
}
