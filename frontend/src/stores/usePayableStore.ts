import { payableService } from "@/services/payables";
import { Status } from "@/types/general";
import { FindAllPayables, FindAllResponse } from "@/types/payables";
import { create } from "zustand";

interface PayableStoreTypes extends FindAllResponse {
  status: Status;
  findAllPayables: (input: FindAllPayables) => Promise<void>;
}

export const usePayableStore = create<PayableStoreTypes>()((set) => ({
  status: "idle",
  payables: [],
  totalPayables: 0,
  totalPages: 0,
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
}));
