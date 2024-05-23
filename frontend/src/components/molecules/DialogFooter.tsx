export const DialogFooter = ({ confirm, cancel, onClose }: any) => {
  return (
    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end">
      <button
        onClick={onClose}
        type="button"
        className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {confirm}
      </button>
      <button
        onClick={onClose}
        type="button"
        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
      >
        {cancel}
      </button>
    </div>
  );
};
