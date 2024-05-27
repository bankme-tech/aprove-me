"use client";

import { CreateAssignorInputDTO } from "@/@core/domain/dtos/assignor.dto";
import { Assignor } from "@/@core/domain/entities/assignor.entity";
import { createContext } from "react";

export type AssignorContextType = {
  assignors: Assignor[];
  createAssignor: (data: CreateAssignorInputDTO) => Promise<Assignor>;
  getAssignor: (id: string) => Promise<Assignor | null>;
  getAllAssignors: () => Promise<Assignor[]>;
};

const defaultPayable: Assignor = {
  id: "",
  name: "",
  email: "",
  phone: "",
  document: "",
};

export const AssignorContext = createContext<AssignorContextType>({
  assignors: [],
  createAssignor: async () => defaultPayable,
  getAssignor: async () => null,
  getAllAssignors: async () => [],
});
