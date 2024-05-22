import { getPayables } from "@/services/payable";
import { useEffect, useState } from "react";
import TableItem from "./components/TableItem";

export default function ListPayable() {
  const [payables, setPayables] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('user');
      if (!token) {
        setIsError(true);
        setErrorMessage('Invalid token JWT!');

        return;
      }

      const request = await getPayables(JSON.parse(token));
      if (request.status === 200) {
        setIsError(false);
        setPayables(request.data);
        return;
      }

      setIsError(true);

      if ('message' in request) {
        setErrorMessage(request.message);
      }
    }

    fetchData();
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                ID
            </th>
            <th scope="col" className="px-6 py-3">
                Valor
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Data de Emissão
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Cedente (ID)
            </th>
          </tr>
        </thead>
        <tbody>
            {payables.map((item) => {
              return <TableItem item={item} />
            })}
        </tbody>
        {isError && <div role="alert">
            <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
              Erro!
            </div>
            <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700">
              <p>{errorMessage}</p>
            </div>
          </div>}
      </table>
    </div>
  );
}
