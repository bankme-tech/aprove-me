import { removePayables } from "@/services/payable";
import { useState } from "react";
import MyInput from "../shared/input/input";

export default function DeletePayable() {
  const [id, setId] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = ({ target }: any) => {
    const { value } = target;
    setId(value);
  };

  const handleClick = async () => {
    const token = localStorage.getItem('user');
    if (!token) {
      setIsError(true);
      setErrorMessage('Invalid token JWT!');

      return;
    }

    const request = await removePayables(JSON.parse(token), id);

    if (request.status === 200) {
      setIsError(false);
      return;
    }

    setIsError(true);

    if ('message' in request) {
      setErrorMessage(request.message);
    }
  };

  return (
    <div>
      <h1 className="text-white mt-5 text-xl">
          Excluir Recebível
      </h1>
      <form className="w-full max-w-lg h-screen bg-gray-800 mt-5">
        <MyInput data={{name: 'id', text: 'ID do Recebível que será removido'}}onSelect={handleChange} />
        <button onClick={handleClick} type="button" className="my-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Remover recebível</button>
      </form>
      {isError && <div role="alert">
        <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
          Erro!
        </div>
        <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700">
          <p>{errorMessage}</p>
        </div>
      </div>}
    </div>
  );
}