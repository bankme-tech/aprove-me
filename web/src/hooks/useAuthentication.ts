'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, removeToken, validateToken } from '../utils/tokenUtils'; 

const useAuthentication = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const functionAssync = async () => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    } else {
      setToken(token);
      const isValid = await validateToken(token);
      if (!isValid) {
        removeToken(); 
        router.push('/login');
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }
    functionAssync();
  }, [router]);

  return { token, loading };
};

export default useAuthentication;
