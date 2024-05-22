import { payableService } from "@/services/payables";
import { Status } from "@/types/general";
import {
  FindAllPayables,
  FindAllResponse,
  PlayableTypes,
} from "@/types/payables";
import { toast } from "sonner";
import { create } from "zustand";

interface PayableStoreTypes extends FindAllResponse {
  status: Status;
  createPayable: (createPayableData: PlayableTypes) => Promise<void>;
  findAllPayables: (input: FindAllPayables) => Promise<void>;
  deletePayable: (payableId: string) => Promise<void>;
}
export const usePayableStore = create<PayableStoreTypes>()((set) => ({
  status: "idle",
  payables: [],
  totalPayables: 0,
  totalPages: 0,
  createPayable: async (createPayableData) => {
    try {
      const payable = await payableService.create(createPayableData);
      set((state) => ({
        ...state,
        payables: [...state.payables, payable],
      }));
    } catch (error) {
      console.error(error);
      toast.error(
        "Algo inesperado aconteceu, por favor tente novamente mais tarde",
      );
    }
  },

  findAllPayables: async (input) => {
    set((state) => ({
      ...state,
      status: "loading",
    }));
    const { totalPages, totalPayables, payables } =
      await payableService.getAll(input);

    set({
      status: "success",
      payables,
      totalPages,
      totalPayables,
    });
  },
  deletePayable: async (payableId) => {
    try {
      await payableService.delete(payableId);

      set((state) => ({
        ...state,
        payables: state.payables.filter((payable) => payable._id !== payableId),
      }));
    } catch (error) {
      console.error(error);
      toast.error(
        "Algo inesperado aconteceu, por favor tente novamente mais tarde",
      );
    }
  },
}));
