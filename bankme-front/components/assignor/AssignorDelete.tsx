import { useState } from "react";
import MyInput from "../shared/input/input";

export default function DeleteAssignor() {
  const [id, setId] = useState('');

  const handleChange = ({ target }: any) => {
    const { value } = target;
    setId(value);
  };

  const handleClick = () => {
    console.log('Clique')
  };

  return (
    <div>
      <h1 className="text-white mt-5 text-xl">
          Excluir Cedente
      </h1>
      <form className="w-full max-w-lg h-screen bg-gray-800 mt-5">
        <MyInput data={{name: 'id', text: 'ID do Cedente que será removido'}}onSelect={handleChange} />
        <button onClick={handleClick} type="button" className="my-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Remover cedente</button>
      </form>
    </div>
  );
}