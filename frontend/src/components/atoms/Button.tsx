type Button = {
  label: string;
};

export const Button = ({ label, ...props }: any) => {
  return (
    <button
      type="button"
      className="w-full h-16 rounded-xl py-2 px-4  bg-primary text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      {...props}
    >
      {label}
    </button>
  );
};
