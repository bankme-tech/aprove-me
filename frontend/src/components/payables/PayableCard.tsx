'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import CardInfo from './CardInfo';

import { Edit, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import PayableForm from './PayableForm';
import { api } from '@/api/axios';
import { Payable } from '@/types/PayableType';


export default function PayableCard({
  payable,
  isDetails
}: {
  payable: Payable;
  isDetails?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);

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
  };

  const handleFormEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    payableInfo: Payable
  ) => {
    e.preventDefault();

    if (
      !payableInfo.value ||
      !payableInfo.emissionDate ||
      !payableInfo.assignorId
    ) {
      toast.error('Fill all fields');
      return;
    }

    if (isNaN(Number(payable.value)) || +payable.value <= 0) {
      toast.error('Value must be a positive number');
      return;
    }

    try {
      await api.patch(`integrations/payable/${payable.id}`, {
        ...payableInfo,
        value: Number(payableInfo.value)
      });
      toast.success('Payable updated successfully');
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error('Error updating payable');
    }
  };

  return (
    <div
      className={`bg-neutral-50 w-[95%] max-w-[${isDetails ? '600' : '500'}px] flex flex-col gap-2 sm:gap-4 p-4 sm:p-6 rounded-lg relative ${isEditing && 'justify-center items-center'}`}
    >
      {isEditing ? (
        <PayableForm
          payable={payable}
          setIsEditing={setIsEditing}
          handleForm={handleFormEdit}
          isEditing
        />
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
