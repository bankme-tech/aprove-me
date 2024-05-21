import TableItem from "./components/TableItem";

export default function ListPayable() {
  const teste = [
    {
      "id": "258f1130-c287-4c6e-a737-ef9d64001da9",
      "value": 1893.69,
      "emissionDate": "2024-01-03",
      "assignor": "bb739dd8-a428-4b04-be46-377d5a690f5f"
    },
    {
      "id": "a7e10e77-8c49-4a91-87d0-dc5eef100552",
      "value": 1527.67,
      "emissionDate": "2023-12-18",
      "assignor": "d485aa40-07b6-40bf-b423-50072a2b4f51"
    },
    {
      "id": "08c7c5cd-8aa8-46e6-ad1c-22392662fcf5",
      "value": 2535.17,
      "emissionDate": "2023-10-18",
      "assignor": "c4ddbf0f-769f-475d-b80a-e226d96db6ad"
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
            {teste.map((item) => {
              return <TableItem item={item} />
            })}
        </tbody>
      </table>
    </div>
  );
}
