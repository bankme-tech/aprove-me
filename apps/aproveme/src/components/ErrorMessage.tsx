import { useNavigate } from "react-router-dom";

type ErrorProps = {
  message: string;
  to: string;
};

export default function ErrorMessage({ message, to }: ErrorProps) {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs md:max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-red-500 font-bold text-2xl">Error: {message}</p>
          <p className="text-gray-700" />
          <button
            onClick={() => navigate(to)}
            className="px-4 py-2 font-medium text-white rounded-md bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
