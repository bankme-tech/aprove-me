export default function TableItem({ item }: any ) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
          {item.id}
      </th>
      <td className="text-white px-6 py-4">
          {item.value}
      </td>
      <td className="text-white px-6 py-4px-6 py-4 whitespace-nowrap">
          {item.emissionDate}
      </td>
      <td className="text-white px-6 py-4 px-6 py-4 whitespace-nowrap">
          {item.assignor}
      </td>
    </tr>
  )
}