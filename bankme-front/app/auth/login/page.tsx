'use client'
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { login as loginUser } from '@/services/auth'
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Login() {
  const { setIsLogged } = useAuthContext();
  const [isDisable, setIsDisable] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState({
    login: '',
    password: ''
  });
  const router = useRouter();

  const minPasswordLength = 5;
  const minLoginLength = 3;

  const buttonValidate = () => {
    const { login, password } = user;
    const status = login.length >= minLoginLength && password.length >= minPasswordLength;
    setIsDisable(!status);
  };

  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = (token: string) => {
    localStorage.setItem('user', JSON.stringify({
      token
    }));
  };

  const handleClick = async (e: any) => {
      const { login, password } = user;
      const request = await loginUser(login, password);
      if (request.status === 201) {
        saveUser(request.data.token);
        setIsLogged(true);
        router.push('/');
        return;
      } 

      setIsError(true);

      if ('message' in request) {
        setErrorMessage(request.message);
      }
  }

  useEffect(() => {
    buttonValidate();
  });

  return (
    <div className="h-screen flex justify-center items-center bg-gray-800">
      <div className="bg-gray-200 rounded-lg shadow p-8 w-full sm:max-w-md">
        <h1 className="text-xl font-bold mb-6">Entrar</h1>
        <form>
          <div className="my-3">
            <label htmlFor="login" className="block mb-2 text-sm font-medium text-gray-900">Login</label>
            <input onChange={handleChange} type="text" name="login" id="login" className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 hover:bg-gray-50" placeholder="Seu Username"  
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
            <input onChange={handleChange} type="password" name="password" id="password" className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 hover:bg-gray-50" placeholder="Sua senha"  
            />
          </div>
          <button disabled={ isDisable } onClick={(e) => handleClick(e.target)} type="button" className="my-10 w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50">Entrar</button>
          <p className="text-sm font-light text-black dark:text-gray-400">
                Não possui conta? 
              <Link href="/auth/register" className="mx-2 font-medium text-blue-600 hover:underline dark:text-primary-500">
                Register
              </Link>
          </p>
          {isError && <div role="alert">
            <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
              Erro!
            </div>
            <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700">
              <p>{errorMessage}</p>
            </div>
          </div>}
        </form>
      </div>
    </div>
  )
}
