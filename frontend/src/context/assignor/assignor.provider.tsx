"use client";

import {
  CreateAssignorInputDTO,
  UpdateAssignorInputDTO,
} from "@/@core/domain/dtos/assignor.dto";
import { Assignor } from "@/@core/domain/entities/assignor.entity";
import { IAssignorService } from "@/@core/domain/services/assignor.service.interface";
import { myContainer } from "@/@core/infra/dependecy-injection/inversify.config";
import { TYPES } from "@/@core/infra/dependecy-injection/types";
import { useEffect, useState } from "react";
import { AssignorContext } from "./assignor.context";

const service = myContainer.get<IAssignorService>(TYPES.IAssignorService);

export const AssignorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [assignors, setAssignors] = useState<Assignor[]>([]);

  const refreshAssignors = async () => {
    const result = await service.findAll();
    setAssignors(result);
  };

  useEffect(() => {
    refreshAssignors();
  }, []);

  const createAssignor = async (data: CreateAssignorInputDTO) => {
    const result = await service.create(data);
    await refreshAssignors();
    return result;
  };

  const getAssignor = async (id: string): Promise<Assignor | null> => {
    const result = await service.findById(id);
    await refreshAssignors();
    return result;
  };

  const getAllAssignors = async (): Promise<Assignor[]> => {
    const result = await service.findAll();
    await refreshAssignors();
    return result;
  };

  const updateAssignor = async (id: string, data: UpdateAssignorInputDTO) => {
    await service.update(id, data);
    await refreshAssignors();
  };

  const deleteAssignor = async (id: string) => {
    await service.delete(id);
    await refreshAssignors();
  };

  return (
    <AssignorContext.Provider
      value={{
        assignors: assignors,
        createAssignor,
        getAssignor,
        getAllAssignors,
        updateAssignor,
        deleteAssignor,
      }}
    >
      {children}
    </AssignorContext.Provider>
  );
};
