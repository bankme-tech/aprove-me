/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { apiBaseUrl } from "../../constants";
import IsLoading from "../isLoading";

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const response = await axios.post(apiBaseUrl + '/auth', { username, password });

      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
    } catch (error: any) {
      const isInvalidLogin = error?.response?.status === 401
      setErrorMessage(isInvalidLogin ? "Usuário ou senha inválidos." : "Erro ao tentar efetuar o login.");
    } finally {
      setIsLoading(false)
    }

  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 py-6">
      <img className="logo-image h-16 w-auto mx-auto mb-4" src='.././../../public/logo-bankme.png' alt="logo"/>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuário
            </label>
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="username" 
             type="text" 
             placeholder="Digite seu usuário" 
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            type="password" 
            placeholder="Digite sua senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            
          </div>
          {errorMessage && (
              <p className="mt-2 mb-4 text-red-500 text-xs italic">{errorMessage}</p>
            )}
          <div className="flex items-center justify-center">
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             type="button"
             onClick={handleLogin}
             >
              <IsLoading isLoading={isLoading} buttonText='Entrar'/>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignIn;