import TableItem from "./components/TableItem";

export default function ListAssignor() {
  const teste: any = [
      {
        "id": 1,
        "document": "123.456.789-00",
        "email": "cedente1@example.com",
        "phone": "+55 11 98765-4321",
        "name": "Cedente Um"
    },
    {
        "id": 2,
        "document": "12.345.678/0001-99",
        "email": "cedente2@example.com",
        "phone": "+55 21 91234-5678",
        "name": "Empresa Dois Ltda"
    },
    {
        "id": 3,
        "document": "987.654.321-00",
        "email": "cedente3@example.com",
        "phone": "+55 31 99876-5432",
        "name": "Cedente Três"
    }
  ];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                ID
            </th>
            <th scope="col" className="px-6 py-3">
                Documento
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Email
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Telefone
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Nome
            </th>
          </tr>
        </thead>
        <tbody>
            {teste.map((item: any) => {
              return <TableItem item={item} />
            })}
        </tbody>
      </table>
    </div>
  );
}
