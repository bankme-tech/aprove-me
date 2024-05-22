import { useEffect } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, Bounce } from "react-toastify";
import { Info } from "lucide-react";

import ErrorMessage from "../components/ErrorMessage";
import { transformCurrency, transformDate } from "../lib/utils";
import { Payable } from "../lib/types";
import {
  deletePayable,
  fetchPayableList,
} from "../lib/resolvers/payableResolvers";
import { useAuth } from "../lib/context/AuthProvider";

export default function PayableListPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  const {
    data: payableList,
    error,
    isLoading,
  } = useQuery<Payable[], Error>({
    queryKey: ["payableList"],
    queryFn: fetchPayableList,
  });

  const queryClient = useQueryClient();

  const {
    mutate: deletePayableMutation,
  }: UseMutationResult<void, Error, string> = useMutation({
    mutationFn: deletePayable,
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["payableList"],
        payableList?.filter((payable) => payable.id !== id)
      );
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
  });

  if (error) {
    return <ErrorMessage message={error.message} to="/payable" />;
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs md:max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Payables</h1>
        <div className="space-y-4">
          {isLoading && <Skeleton count={2} height={30} />}
          {!isLoading && payableList?.length === 0 && (
            <p className="text-center text-gray-500">No payables found :(</p>
          )}
          {payableList?.map((payable) => (
            <div key={payable.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">
                    {transformCurrency(payable.value)}
                  </p>
                  <p className="text-gray-500">
                    {transformDate(payable.emissionDate)}
                  </p>
                </div>
                <div className="flex items-center">
                  <Link to={`/payable/${payable.id}`}>
                    <Info />
                  </Link>
                  <button
                    onClick={() => deletePayableMutation(payable.id)}
                    className="ml-2 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
