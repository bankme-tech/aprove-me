'use client';
import React, { useEffect, useState } from 'react';
import Input from '../ui/Input/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '@/api/axios';
import { handleChange } from '@/utils/utils';
import { Payable } from '@/types/PayableType';
import { Assignor } from '@/types/AssignorType';

type PayableFormProps = {
  payable: Payable;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing?: boolean;
  handleForm: (
    event: React.FormEvent<HTMLFormElement>,
    payableInfo: Payable
  ) => void;
};

export default function PayableForm({
  payable,
  setIsEditing,
  isEditing,
  handleForm
}: PayableFormProps) {
  const initialDate = new Date(payable?.emissionDate) as unknown as string;

  const [payableInfo, setPayableInfo] = useState<Payable>({
    ...payable,
    emissionDate: initialDate
  });
  const [assignors, setAssignors] = useState<Assignor[]>([]);

  useEffect(() => {
    const getAssignors = async () => {
      try {
        const { data } = await api.get('integrations/assignor');
        setAssignors(data);
        await api.get(`integrations/payable/${payable.id}`);
      } catch (error) {
        toast.error('Error fetching assignors');
      }
    };
    getAssignors();
  }, [payable.id]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleChange(e, setPayableInfo);
  };

  const handleDateChange = (date: Date) => {
    setPayableInfo({ ...payableInfo, emissionDate: date as unknown as string });
  };

  const verifyNumber = (value: string) => !(isNaN(Number(value)) || +value <= 0)

  return (
    <form
      className="flex flex-col gap-2 mt-2 text-black items-center justify-center w-full"
      onSubmit={(e) => handleForm(e, payableInfo)}
    >
      <Input
        name="value"
        type="number"
        onChange={handleFormChange}
        value={payableInfo.value}
        verifyValue={verifyNumber}
      >
        Value
      </Input>
      <label htmlFor="" className="flex flex-col justify-center w-full">
        Emission Date
        <DatePicker
          selected={payableInfo.emissionDate as unknown as Date}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MM/dd/yyyy h:mm aa"
          className="form-control w-full ring-1 ring-zinc-900/20 bg-zinc-50 p-[6px] rounded-xl outline-1 px-3 mb-3"
        />
      </label>

      <select
        name="assignorId"
        defaultValue={payableInfo.assignorId}
        onChange={handleFormChange}
        className="w-full p-2 rounded-xl mb-2"
      >
        {!isEditing && <option value="">Select an assignor</option>}
        {assignors?.map((assignor) => (
          <option key={assignor.id} value={assignor.id}>
            {assignor.name}
          </option>
        ))}
      </select>

      {isEditing && setIsEditing && (
        <button
          onClick={() => setIsEditing(false)}
          className="bg-slate-800 text-white rounded-md p-[2px] sm:p-1 absolute top-2 right-4 sm:right-6"
          type="button"
        >
          <X />
        </button>
      )}

      <button
        className="p-2 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-4 rounded-lg md:text-lg w-full"
        type="submit"
      >
        {isEditing ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
