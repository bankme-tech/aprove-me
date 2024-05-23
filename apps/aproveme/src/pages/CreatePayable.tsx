import { useState } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Bounce } from "react-toastify";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { Assignor, Payable } from "../lib/types";
import { fetchAssignorList } from "../lib/resolvers/assignorResolvers";
import {
  createPayable,
  CreatePayableFormData,
  createPayableSchema,
} from "../lib/resolvers/payableResolvers";

export default function CreatePayable() {
  const { data: assignorList, isLoading } = useQuery<Assignor[], Error>({
    queryKey: ["assignorList"],
    queryFn: fetchAssignorList,
  });

  const {
    mutate,
  }: UseMutationResult<Payable, Error, Omit<Payable, "id">> = useMutation({
    mutationFn: createPayable,
    onSuccess: () => {
      reset();
      setAssignorId("");
      toast.success("Payable created!", {
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
    setValue,
    reset,
  } = useForm<CreatePayableFormData>({
    resolver: zodResolver(createPayableSchema),
  });

  const onSubmit = (data: CreatePayableFormData) => {
    mutate(data);
  };

  const [assignorId, setAssignorId] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs md:max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Payable</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700" htmlFor="value">
              Value
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              id="value"
              placeholder="Enter value"
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
              {...register("emissionDate")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              id="emissionDate"
              type="date"
            />
            {errors.emissionDate && (
              <p className="text-red-500">{errors.emissionDate.message}</p>
            )}
          </div>
          <div>
            <label
              className="block font-medium text-gray-700"
              htmlFor="assignor"
            >
              Assignor
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="w-full justify-between"
                  role="combobox"
                  variant="outline"
                  aria-expanded={open}
                >
                  {assignorId
                    ? assignorList?.find(
                        (assignor) => assignor.id === assignorId
                      )?.email
                    : "Select assignor..."}
                  <span className="ml-2 h-4 w-4 shrink-0 opacity-50">▼</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    className="h-9"
                    placeholder={
                      isLoading ? "Loading..." : "Search assignor..."
                    }
                    disabled={isLoading}
                  />
                  <CommandEmpty>No assignor found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {assignorList?.map((assignor) => (
                        <CommandItem
                          {...register("assignorId")}
                          onSelect={(currentValue) => {
                            setAssignorId(
                              currentValue === assignorId ? "" : currentValue
                            );
                            setValue("assignorId", assignor.id);
                            setOpen(false);
                          }}
                          value={assignor.id}
                          key={assignor.id}
                        >
                          {assignor.email}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.assignorId && (
              <p className="text-red-500">{errors.assignorId.message}</p>
            )}
          </div>
          <button
            className="w-full px-4 py-2 font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            type="submit"
          >
            Create Payable
          </button>
        </form>
      </div>
    </main>
  );
}
