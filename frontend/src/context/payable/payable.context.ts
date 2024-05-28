"use client";

import { CreatePayableInputDTO } from "@/@core/domain/dtos/payable.dto";
import { Payable } from "@/@core/domain/entities/payable.entity";
import { createContext } from "react";

export type PayableContextType = {
  payables: Payable[];
  createPayable: (data: CreatePayableInputDTO) => Promise<Payable>;
  getPayable: (id: string) => Promise<Payable | null>;
  getAllPayables: () => Promise<Payable[]>;
  updatePayable: (id: string, data: CreatePayableInputDTO) => Promise<void>;
  deletePayable: (id: string) => Promise<void>;
};

const defaultPayable: Payable = {
  id: "",
  value: 0,
  emissionDate: new Date(),
  assignorId: "",
};

export const PayableContext = createContext<PayableContextType>({
  payables: [],
  createPayable: async () => defaultPayable,
  getPayable: async () => null,
  getAllPayables: async () => [],
  updatePayable: async () => {},
  deletePayable: async () => {},
});
