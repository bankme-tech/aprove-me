import { AssignorMessagesError } from "@/lib/assignorMessagesError";
import { AssignorService } from "@/services/assignor";
import { AssignorTypes } from "@/types/assignor";
import { Status } from "@/types/general";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface AssignorStoreTypes {
  status: Status;
  createAssignor: (input: AssignorTypes) => Promise<void>;
}

export const useAssignorStore = create<AssignorStoreTypes>()((set) => ({
  status: "idle",
  createAssignor: async (input) => {
    set({
      status: "loading",
    });

    try {
      await AssignorService.create(input).then(() => {
        set({
          status: "success",
        });
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        set({
          status: "error",
        });

        toast.error(AssignorMessagesError(error.response?.data.message));

        return;
      }
    }
  },
}));
