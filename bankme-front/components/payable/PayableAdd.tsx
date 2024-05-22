import { getAssignors } from "@/services/assignor";
import { addPayables } from "@/services/payable";
import { useEffect, useState } from "react";
import Combobox from "../shared/combobox/Combobox";
import MyInput from "../shared/input/input";

export default function AddPayable() {
  const [payable, setPayable] = useState({
    value: '',
    emissionDate: '',
    assignorId: ''
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [comboboxItems, setCoboboxItems] = useState([]);

  useEffect(() => {
    const comboboxData = async () => {
      const token = localStorage.getItem('user');
      if (!token) {
        setIsError(true);
        setErrorMessage('Invalid token JWT!');

        return;
      }

      const request = await getAssignors(JSON.parse(token));
      if (request.status === 200) {
        setCoboboxItems(request.data);
        return;
      }

      setIsError(true);

      if ('message' in request) {
        setErrorMessage(request.message);
      }
    }

    comboboxData();
  });

  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    console.log(name, value);
    setPayable({ ...payable, [name]: value });
  };

  const handleClick = async () => {
    const token = localStorage.getItem('user');
    if (!token) {
      setIsError(true);
      setErrorMessage('Invalid token JWT!');

      return;
    }

    const request = await addPayables(JSON.parse(token), payable);

    if (request.status === 201) {
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
        Adicionar Recebível
      </h1>
      <form className="bg-gray-800 mt-16">
        <MyInput type="number" data={{name: 'value', text: 'Valor do Recebível'}} onSelect={handleChange} />
        <MyInput data={{name: 'emissionDate', text: 'Data de Emissão'}} onSelect={handleChange} />
        <div className="relative z-0 w-full mb-6 group">
          <Combobox items={comboboxItems} onSelect={handleChange} />
        </div>
        <button onClick={handleClick} type="button" className="my-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Adicionar Recebível</button>
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
  )
}
