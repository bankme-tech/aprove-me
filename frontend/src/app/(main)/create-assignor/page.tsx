'use client';
import { useState } from 'react';
import { api } from '../../../api/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handleChange } from '../../../utils/utils';
import Input from '../../../components/ui/Input/Input';
import { Assignor } from '@/types/AssignorType';
import { AxiosError } from 'axios';

interface InitialAssignor extends Omit<Assignor, 'id'> { }

export default function AssignorForm() {
  const initialAssignor = {
    name: '',
    document: '',
    email: '',
    phone: ''
  };

  const [assignorInfo, setAssignorInfo] =
    useState<InitialAssignor>(initialAssignor);

  const router = useRouter();

  const handleCreatePayable = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const { data } = await api.post('integrations/assignor', {
        ...assignorInfo,
        phone: assignorInfo.phone.trim().replace(/\D/g, ''),
        document: assignorInfo.document.trim().replace(/\D/g, '')
      });
      router.push(`/assignor/${data.id}`);
    } catch (error) {
      toast.error('Error creating assignor');
      if (((error as AxiosError)?.response?.status) === 409) {
        toast.error('Assignor already exists')
      }
      if (((error as AxiosError)?.response?.status) === 401) {
        toast.error('Session expired')
        router.push('/signIn')
      }
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleChange(e, setAssignorInfo);
  };

  const verifyEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const verifyName = (name: string) => name.length >= 3;

  const isCPFOrCNPJValid = (value: string) => {
    if (!Number(value)) return false;

    const numericValue = value.replace(/[^\d]+/g, '');
    return numericValue.length === 11 || numericValue.length === 14;
  };

  function isPhoneNumberValid(phoneNumber: string) {
    const phoneRegex = /^\d{11}$/;
    const cleanPhoneNumber = phoneNumber.trim().replace(/\D/g, '');
    return phoneRegex.test(cleanPhoneNumber);
  }

  const isInputsValid = () => {
    return (
      verifyEmail(assignorInfo.email) &&
      verifyName(assignorInfo.name) &&
      isCPFOrCNPJValid(assignorInfo.document) &&
      isPhoneNumberValid(assignorInfo.phone)
    );
  };

  return (
    <section className="w-full flex flex-col items-center justify-center gap-2 sm:gap-4 p-4 sm:p-6 rounded-xl relative bg-neutral-50 max-w-[600px]">
      <form
        className="flex flex-col gap-4 text-black items-center justify-center w-full"
        onSubmit={handleCreatePayable}
      >
        <Input
          name="name"
          type="text"
          onChange={handleFormChange}
          value={assignorInfo.name}
          verifyValue={verifyName}
          placeholder="John Doe"
        >
          Name
        </Input>

        <Input
          name="document"
          type="text"
          onChange={handleFormChange}
          value={assignorInfo.document}
          verifyValue={isCPFOrCNPJValid}
          placeholder="CPF or CNPJ"
        >
          Document
        </Input>
        <Input
          name="email"
          type="email"
          onChange={handleFormChange}
          value={assignorInfo.email}
          verifyValue={verifyEmail}
          placeholder="email@example.com"
        >
          Email
        </Input>

        <Input
          name="phone"
          type="tel"
          onChange={handleFormChange}
          value={assignorInfo.phone}
          verifyValue={isPhoneNumberValid}
          placeholder="00 91234-5678"
        >
          Phone
        </Input>

        <button
          disabled={!isInputsValid()}
          className="p-2 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-4 rounded-lg md:text-lg w-full disabled:cursor-not-allowed"
        >
          Create
        </button>
      </form>
    </section>
  );
}
