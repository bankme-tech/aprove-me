'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { AppRoutes } from '@/constants/app-routes';
import { useAPI } from '@/hooks/useAPI';
import { useAppContext } from '@/hooks/useAppContext';
import { loginSchema } from '@/schemas/auth/login-schema';
import type { LoginSchema } from '@/schemas/auth/login-schema';
import { isApiError } from '@/utils/functions';

export const Form: React.FC = () => {
  const { api } = useAPI();
  const { setUser } = useAppContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await api.users.create(data);
      const res = await api.auth.login(data);
      Cookies.set('accessToken', res.accessToken);
      setUser(res.user);
      toast.success('Login successful');
      router.push(AppRoutes.home);
    } catch (error) {
      if (isAxiosError(error)) {
        if (isApiError(error.response?.data)) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error('An error occurred while trying to login');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-screen w-1/2 flex-col items-center justify-center px-16"
    >
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Login</span>
        </div>
        <input
          type="text"
          placeholder="Type here login"
          className="input input-sm input-bordered w-full"
          {...register('login')}
        />

        {errors.login && (
          <div className="label">
            <span
              className="label-text-alt text-error"
              data-testid="register-error-message"
            >
              {errors.login.message}
            </span>
          </div>
        )}
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="text"
          placeholder="Type here password"
          className="input input-sm input-bordered w-full"
          {...register('password')}
        />

        {errors.password && (
          <div className="label">
            <span
              className="label-text-alt text-error"
              data-testid="password-error-message"
            >
              {errors.password.message}
            </span>
          </div>
        )}
      </label>

      <button type="submit" className="btn btn-primary btn-sm btn-block mt-4">
        Register
      </button>
    </form>
  );
};
