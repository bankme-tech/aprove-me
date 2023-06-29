import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 py-6">
          <h1 className="text-2xl font-bold mb-4">Oops!</h1>
          <p className="text-gray-700 mb-4">Desculpe, ocorreu um erro inesperado.</p>
          <p className="text-gray-700 mb-4">
            <i className="mt-2 mb-4 text-red-500 text-xs italic">{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </div>
  );
}