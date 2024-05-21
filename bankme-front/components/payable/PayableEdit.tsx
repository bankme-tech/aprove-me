import { useState } from "react";
import Combobox from "../combobox/Combobox";

export default function EditPayable() {
  const [payable, setPayable] = useState({
    value: '',
    emissionDate: '',
    assignor: ''
  });

  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    setPayable({ ...payable, [name]: value });
  };

  return (    
    <div>
      <h1 className="text-white mt-5 text-xl">
        Editar Recebível
      </h1>
      <form className="bg-gray-800 mt-16">
        <div className="relative z-0 w-full mb-6 group">
            <input onChange={handleChange} type="text" name="value" id="value" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="value" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valor do Recebível</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
            <input onChange={handleChange} type="text" name="date" id="date" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="date" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data de Emissão</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
            <Combobox items={[]} onSelect={handleChange}></Combobox>
        </div>
        <button onClick={() =>console.log('cliquei')} type="button" className="my-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Editar Recebível</button>
      </form>
    </div>
  )
}
