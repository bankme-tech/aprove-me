export const TableBody = () => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr className="hover:bg-gray-100">
        <td className="p-4 w-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-1"
              type="checkbox"
              className="w-4 h-4 text-primary bg-white rounded border-gray-300 focus:ring-primary focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-table-1" className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <td className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap">
          Apple Imac 27
        </td>
        <td className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap">
          Desktop PC
        </td>
        <td className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap">
          $1999
        </td>
        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
          <a href="#" className="text-primary-dark hover:underline">
            Edit
          </a>
        </td>
      </tr>
    </tbody>
  );
};
