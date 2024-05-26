import { useState } from 'react';
import Input from './ui/Input/Input';
import Link from 'next/link';
import { handleChange } from '@/utils/utils';

export interface UserData {
  email: string;
  password: string;
}

interface LoginFormProps {
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    userData: UserData
  ) => void;
  loading: boolean;
  isSignup?: boolean;
}

export default function LoginForm({
  handleSubmit,
  loading,
  isSignup
}: LoginFormProps) {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: ''
  });

  const verifyEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const verifyPassword = (password: string) => password.length >= 4;

  const isAllowedToClick =
    loading ||
    !verifyEmail(userData.email) ||
    !verifyPassword(userData.password);

  return (
    <section className=" w-full text-black flex justify-center items-center h-full">
      <div className="p-8 w-4/5 max-w-[400px] bg-neutral-50 rounded-xl flex flex-col items-center">
        <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
          {isSignup ? 'Sign up' : 'Sign in'}
        </h1>

        <form
          onSubmit={(e) => handleSubmit(e, userData)}
          className="flex flex-col mt-4 w-full gap-4"
        >
          <Input
            type="email"
            verifyValue={verifyEmail}
            value={userData.email}
            name="email"
            onChange={(e) => handleChange(e, setUserData)}
            placeholder="example@email.com"
          >
            Email
          </Input>
          <Input
            verifyValue={verifyPassword}
            type="password"
            value={userData.password}
            name="password"
            onChange={(e) => handleChange(e, setUserData)}
            placeholder="********"
          >
            Password
          </Input>

          <button
            type="submit"
            disabled={isAllowedToClick}
            className={`p-2 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-4 rounded-lg ${isAllowedToClick && 'cursor-not-allowed'} md:text-lg`}
          >
            {isSignup ? 'Create account' : 'Log in'}
          </button>
        </form>

        <span className="text-xs font-light sm:text-sm">
          {isSignup ? 'Already have an account? ' : 'No account? '}
          <Link
            href={isSignup ? '/signIn' : '/signUp'}
            className="font-semibold underline"
          >
            {isSignup ? 'Log in ' : 'Create one '}
          </Link>
        </span>
      </div>
    </section>
  );
}
