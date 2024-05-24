'use client';

import LoginForm, { UserData } from '../../../components/LoginForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/UseAuth';

export default function SignIn() {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const handleSignIn = async (
    event: React.FormEvent<HTMLFormElement>,
    userData: UserData
  ) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(userData.email, userData.password);
      router.push('/payables');
    } catch (error: unknown) {
      toast.error(
        (error as { response: { data: { message: string } } })?.response?.data?.message || 'Internal server error'
      );
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm handleSubmit={handleSignIn} loading={loading} />;
}
