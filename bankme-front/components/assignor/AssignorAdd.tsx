import { useState } from "react";
import Combobox from "../shared/combobox/Combobox";
import MyInput from "../shared/input/input";

export default function AddAssignor() {
  const [assignor, setAssignor] = useState({
    document: '',
    email: '',
    phone: '',
    name: ''
  });

  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    console.log(name, value);
    setAssignor({ ...assignor, [name]: value });
  };

  return (    
    <div>
      <h1 className="text-white mt-5 text-xl">
        Adicionar Cedente
      </h1>
      <form className="bg-gray-800 mt-16">
        <MyInput data={{name: 'document', text: 'Documento'}} onSelect={handleChange} />
        <MyInput data={{name: 'email', text: 'Email'}} onSelect={handleChange} />
        <MyInput data={{name: 'phone', text: 'Telefone'}} onSelect={handleChange} />
        <MyInput data={{name: 'name', text: 'Nome do Cedente'}} onSelect={handleChange} />
        <button onClick={() =>console.log('cliquei')} type="button" className="my-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Adicionar Cedente</button>
      </form>
    </div>
  )
}