'use client';
import { useState } from 'react';
import { api } from '../api/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handleChange } from '../utils/utils';
import Input from '../components/ui/Input/Input';

export interface Assignor {
  id?: string;
  document: string;
  email: string;
  phone: string;
  name: string;
}

export default function AssignorForm() {
  const initialAssignor = {
    name: '',
    document: '',
    email: '',
    phone: ''
  };

  const [assignorInfo, setAssignorInfo] = useState<Assignor>(initialAssignor);

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
      toast.error((error as { response: { data: { message: string } } })?.response?.data?.message || 'Internal server error');
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
    return numericValue.length === 11 || numericValue.length === 14
  }

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
  }

  return (
    <main className="h-[100vh] w-full text-white flex justify-center items-center ">
      <div className="bg-neutral-50 w-4/5 max-w-[500px] p-4 rounded-lg flex items-center justify-center">
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

          <button disabled={!isInputsValid()} className="p-2 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-4 rounded-lg md:text-lg w-full disabled:cursor-not-allowed">
            Create
          </button>
        </form>
      </div>
    </main>
  );
}
