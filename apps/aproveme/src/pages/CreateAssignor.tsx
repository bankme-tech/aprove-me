import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Bounce } from "react-toastify";
import { Assignor } from "../lib/types";
import {
  CreateAssignorFormData,
  createAssignor,
  createAssignorSchema,
} from "../lib/resolvers/assignorResolvers";

export default function CreateAssignor() {
  const { mutate }: UseMutationResult<Assignor, Error, CreateAssignorFormData> =
    useMutation({
      mutationFn: createAssignor,
      onSuccess: () => {
        reset();
        toast.success("Assignor created!", {
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

    reset,
  } = useForm<CreateAssignorFormData>({
    resolver: zodResolver(createAssignorSchema),
  });

  const onSubmit = (data: CreateAssignorFormData) => {
    mutate(data);
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs md:max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Assignor</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              id="name"
              placeholder="Enter name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              className="block font-medium text-gray-700"
              htmlFor="document"
            >
              Document
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              id="document"
              placeholder="Enter document"
              {...register("document")}
            />
            {errors.document && (
              <p className="text-red-500">{errors.document.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              id="email"
              placeholder="Enter email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700" htmlFor="phone">
              Phone
            </label>
            <input
              {...register("phone")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              id="phone"
              placeholder="Enter phone number"
              type="phone"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <button
            className="w-full px-4 py-2 font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            type="submit"
          >
            Create Assignor
          </button>
        </form>
      </div>
    </main>
  );
}
