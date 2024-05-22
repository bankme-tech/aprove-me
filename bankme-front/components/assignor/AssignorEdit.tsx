import { editAssignor } from "@/services/assignor";
import { useState } from "react";
import Combobox from "../shared/combobox/Combobox";
import ErrorComponent from "../shared/error/Error";
import MyInput from "../shared/input/input";

export default function EditAssignor() {
  const [assignor, setAssignor] = useState({
    id: '',
    document: '',
    email: '',
    phone: '',
    name: ''
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    console.log(name, value);
    setAssignor({ ...assignor, [name]: value });
  };

  const handleClick = async () => {
    const token = localStorage.getItem('user');
    if (!token) {
      setIsError(true);
      setErrorMessage('Invalid token JWT!');

      return;
    }

    const request = await editAssignor(JSON.parse(token), assignor, assignor.id);

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
        Editar Cedente
      </h1>
      <form className="bg-gray-800 mt-16">
        <MyInput data={{name: 'id', text: 'ID do Cedente que será alterado'}} onSelect={handleChange} />
        <MyInput data={{name: 'document', text: 'Documento'}} onSelect={handleChange} />
        <MyInput data={{name: 'email', text: 'Email'}} onSelect={handleChange} />
        <MyInput data={{name: 'phone', text: 'Telefone'}} onSelect={handleChange} />
        <MyInput data={{name: 'name', text: 'Nome do Cedente'}} onSelect={handleChange} />
        <button onClick={handleClick} type="button" className="my-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Editar Cedente</button>
      </form>
      {isError && <ErrorComponent errorMessage={errorMessage}/>}
    </div>
  )
}