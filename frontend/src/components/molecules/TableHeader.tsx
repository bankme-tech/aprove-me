export const TableHeader = () => {
  return (
    <thead className="bg-white">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input
              id="checkbox-all"
              type="checkbox"
              className="w-4 h-4 text-primary bg-white rounded border-gray-300 focus:ring-primary focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-all" className="sr-only">
              checkbox
            </label>
          </div>
        </th>
        <th
          scope="col"
          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-primary-dark uppercase"
        >
          Product Name
        </th>
        <th
          scope="col"
          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-primary-dark uppercase"
        >
          Category
        </th>
        <th
          scope="col"
          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-primary-dark uppercase"
        >
          Price
        </th>
        <th scope="col" className="p-4">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
};
