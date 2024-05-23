'use client'

import LoginForm, { UserData } from '../components/LoginForm'
import { api } from '../api/axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>, userData: UserData) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth', userData)
      console.log(response)
      router.push('/')

    } catch (error: unknown) {
      toast.error(error?.response?.data?.message || 'Internal server error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoginForm handleSubmit={handleSignIn} loading={loading} />
  )
}
