'use client'

import React, { useState } from 'react'
import LoginForm, { UserData } from '../components/LoginForm/LoginForm'
import { useRouter } from 'next/navigation';
import { api } from '../api/axios';
import toast from 'react-hot-toast';

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>, userData: UserData) => {
    event.preventDefault();
    setLoading(true);

    try {
      await api.post('/users', userData)
      router.push('/signIn');
    } catch (error: unknown) {
      toast.error(error?.response?.data?.message || 'Internal server error');
    } finally {
      setLoading(false);
    }
  }
  return <LoginForm handleSubmit={handleSignIn} loading={loading} isSignup />
}
