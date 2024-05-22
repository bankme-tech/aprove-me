import { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate, Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, Bounce } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ErrorMessage from "../components/ErrorMessage";
import { transformCurrency, transformDate } from "../lib/utils";
import { Payable } from "../lib/types";
import { fetchPayable, updatePayable } from "../lib/resolvers/payableResolvers";
import { useAuth } from "../lib/context/AuthProvider";

const editPayableSchema = z.object({
  value: z.coerce.number().min(0.1),
  emissionDate: z.string().date(),
});

type EditPayableFormData = z.infer<typeof editPayableSchema>;

export default function PayableInfoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const {
    data: payable,
    error,
    isLoading,
  } = useQuery<Payable, Error>({
    queryKey: ["payable", id],
    queryFn: () => fetchPayable(id!),
  });

  const queryClient = useQueryClient();

  const {
    mutate: updatePayableMutation,
  }: UseMutationResult<Payable, Error, Payable> = useMutation({
    mutationFn: updatePayable,
    onSuccess: (data) => {
      queryClient.setQueryData(["payable", id], data);
      setIsEditing(false);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPayableFormData>({
    resolver: zodResolver(editPayableSchema),
    defaultValues: {
      value: payable?.value || 0,
      emissionDate: payable
        ? new Date(payable.emissionDate).toISOString().slice(0, 10)
        : "",
    },
  });

  const onSubmit = (data: EditPayableFormData) => {
    if (payable) {
      updatePayableMutation({ ...payable, ...data });
    }
  };

  if (error) {
    return <ErrorMessage message={error.message} to="/payable" />;
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs md:max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Payable</h1>
        <div className="space-y-4">
          {isLoading && <Skeleton count={2} height={30} />}
          {!isLoading && !payable && (
            <p className="text-center text-gray-500">Payable not found :(</p>
          )}
          {!isLoading && payable && (
            <div key={payable.id} className="bg-white rounded-lg shadow-md p-4">
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label
                      className="block font-medium text-gray-700"
                      htmlFor="value"
                    >
                      Value
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      id="value"
                      type="number"
                      {...register("value")}
                    />
                    {errors.value && (
                      <p className="text-red-500">{errors.value.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block font-medium text-gray-700"
                      htmlFor="emissionDate"
                    >
                      Emission Date
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      id="emissionDate"
                      type="date"
                      {...register("emissionDate")}
                    />
                    {errors.emissionDate && (
                      <p className="text-red-500">
                        {errors.emissionDate.message}
                      </p>
                    )}
                  </div>
                  <button
                    className="w-full px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="w-full mt-2 px-4 py-2 font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700">
                      {transformCurrency(payable.value)}
                    </p>
                    <p className="text-gray-500">
                      {transformDate(payable.emissionDate)}
                    </p>
                    <Link
                      to={`/assignor/${payable.assignorId}`}
                      className="text-blue-500 hover:underline"
                    >
                      Assignor information
                    </Link>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="ml-2 px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
