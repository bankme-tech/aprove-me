'use client'
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { register as registerUser } from '@/services/auth'
import { useAuthContext } from "@/context/AuthContext";
import ErrorComponent from "@/components/shared/error/Error";

export default function Register() {
  const { setIsLogged } = useAuthContext();
  const [isDisable, setIsDisable] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState({
    login: '',
    password: '',
    passwordRepeat: ''
  });
  const router = useRouter();

  const minPasswordLength = 5;
  const minLoginLength = 3;

  const buttonValidate = () => {
    const { login, password, passwordRepeat } = user;
    const status = login.length >= minLoginLength && password.length >= minPasswordLength && password === passwordRepeat;
    setIsDisable(!status);
  };

  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleClick = async (e: any) => {
    const { login, password } = user;
    const request = await registerUser(login, password);
    if (request.status === 201) {
      setIsLogged(true);
      router.push('/auth/login');
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
    <div className="bg-gray-800 h-screen flex justify-center items-center">
      <div className="bg-gray-200 rounded-lg shadow p-8 w-full sm:max-w-md">
        <h1 className="text-2xl font-bold mb-6">Entrar</h1>
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
          <div>
            <label htmlFor="password-repeat" className="block mb-2 text-sm font-medium text-gray-900 mt-3">Repetir Senha</label>
            <input onChange={handleChange} type="password" name="passwordRepeat" id="password-repeat" className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 hover:bg-gray-50" placeholder="Repetir senha"  
            />
          </div>
          <button disabled={ isDisable } onClick={(e) => handleClick(e.target)} type="button" className="my-10 w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50">Entrar</button>
          {isError && <ErrorComponent errorMessage={errorMessage}/>}
        </form>
      </div>
    </div>
  )
}