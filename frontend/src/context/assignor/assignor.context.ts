"use client";

import {
  CreateAssignorInputDTO,
  UpdateAssignorInputDTO,
} from "@/@core/domain/dtos/assignor.dto";
import { Assignor } from "@/@core/domain/entities/assignor.entity";
import { createContext } from "react";

export type AssignorContextType = {
  assignors: Assignor[];
  createAssignor: (data: CreateAssignorInputDTO) => Promise<Assignor>;
  getAssignor: (id: string) => Promise<Assignor | null>;
  getAllAssignors: () => Promise<Assignor[]>;
  updateAssignor: (id: string, data: UpdateAssignorInputDTO) => Promise<void>;
  deleteAssignor: (id: string) => Promise<void>;
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
  updateAssignor: async () => {},
  deleteAssignor: async () => {},
});
