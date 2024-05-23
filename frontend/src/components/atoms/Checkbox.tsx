export const Checkbox = () => {
  return (
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
  );
};
