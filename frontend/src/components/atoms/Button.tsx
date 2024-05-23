type Button = {
  label: string;
};

export const Button = ({ children, secondary, ...props }: any) => {
  return (
    <button
      type="button"
      className={`w-full h-16 rounded-xl py-2 px-4 ${
        secondary
          ? "bg-white border border-primary text-primary hover:bg-gray-100  hover:border-success focus:bg-success hover:text-primary-dark"
          : "bg-primary text-white font-semibold hover:text-success hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
