import { AssignorMessagesError } from "@/lib/assignorMessagesError";
import { AssignorService } from "@/services/assignor";
import { Assignor, AssignorTypes } from "@/types/assignor";
import { Status } from "@/types/general";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface AssignorStoreTypes {
  status: Status;
  assignors: Assignor[];
  getAllAssignors: () => void;
  createAssignor: (input: AssignorTypes) => Promise<void>;
}

export const useAssignorStore = create<AssignorStoreTypes>()((set) => ({
  status: "idle",
  assignors: [],
  getAllAssignors: async () => {
    const { assignors } = await AssignorService.getAll();

    set((state) => ({
      ...state,
      assignors,
    }));
  },

  createAssignor: async (input) => {
    set((state) => ({
      ...state,
      status: "loading",
    }));

    try {
      await AssignorService.create(input).then(() => {
        set((state) => ({
          ...state,
          status: "success",
        }));
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        set((state) => ({
          ...state,
          status: "error",
        }));

        toast.error(AssignorMessagesError(error.response?.data.message));

        return;
      }
    }
  },
}));
