import { payableService } from "@/services/payables";
import { Status } from "@/types/general";
import { FindAllResponse, PlayableTypes } from "@/types/payables";
import { toast } from "sonner";
import { create } from "zustand";

interface PayableStoreTypes extends FindAllResponse {
  status: Status;
  skip: number;
  take: number;
  currentPage: number;
  increaseSkip: () => void;
  decreaseSkip: () => void;
  handleTake: (take: number) => void;
  createPayable: (createPayableData: PlayableTypes) => Promise<void>;
  findAllPayables: () => Promise<void>;
  editPayable: (
    editPayableData: PlayableTypes,
    payableId: string,
  ) => Promise<void>;
  deletePayable: (payableId: string) => Promise<void>;
}
export const usePayableStore = create<PayableStoreTypes>()((set, get) => ({
  status: "idle",
  skip: 0,
  take: 5,
  currentPage: 1,
  payables: [],
  totalPayables: 0,
  totalPages: 0,
  increaseSkip: () => {
    set((state) => ({
      ...state,
      currentPage: ++get().currentPage,
      skip: get().currentPage > 1 ? --get().currentPage : 0,
    }));
  },

  decreaseSkip: () => {
    set((state) => ({
      ...state,
      currentPage: --get().currentPage,
      skip: get().currentPage > 1 ? --get().currentPage : 0,
    }));
  },

  handleTake: (take) => set((state) => ({ ...state, take })),

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

  editPayable: async (editPayableData, payableId) => {
    const payable = await payableService.edit(editPayableData, payableId);

    const payables = get().payables;

    const payableIndex = payables.findIndex(
      (payable) => payable._id === payableId,
    );

    if (payableIndex >= 0) {
      const updatedPayables = [...payables];

      updatedPayables[payableIndex] = payable;

      set((state) => ({
        ...state,
        payables: updatedPayables,
      }));
    }
  },

  findAllPayables: async () => {
    set((state) => ({
      ...state,
      status: "loading",
    }));
    const { totalPages, totalPayables, payables } = await payableService.getAll(
      { skip: get().skip, take: get().take },
    );

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
