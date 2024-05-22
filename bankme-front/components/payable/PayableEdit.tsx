import { getAssignors } from "@/services/assignor";
import { editPayables } from "@/services/payable";
import { useEffect, useState } from "react";
import Combobox from "../shared/combobox/Combobox";
import ErrorComponent from "../shared/error/Error";
import MyInput from "../shared/input/input";

export default function EditPayable() {
  const [payable, setPayable] = useState({
    id: '',
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
    setPayable({ ...payable, [name]: value });
  };

  const handleClick = async () => {
    const token = localStorage.getItem('user');
    if (!token) {
      setIsError(true);
      setErrorMessage('Invalid token JWT!');

      return;
    }

    const request = await editPayables(JSON.parse(token), payable, payable.id);

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
        Editar Recebível
      </h1>
      <form className="bg-gray-800 mt-16">
        <MyInput data={{name: 'id', text: 'UUID do Recebível que será alterado'}} onSelect={handleChange} />
        <MyInput type="number" data={{name: 'value', text: 'Valor do Recebível'}} onSelect={handleChange} />
        <MyInput data={{name: 'emissionDate', text: 'Data de Emissão'}} onSelect={handleChange} />
        <div className="relative z-0 w-full mb-6 group">
          <Combobox items={comboboxItems} onSelect={handleChange} />
        </div>
        <button onClick={handleClick} type="button" className="my-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Editar Recebível</button>
      </form>
      {isError && <ErrorComponent errorMessage={errorMessage}/>}
    </div>
  )
}
