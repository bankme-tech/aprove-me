"use client";

import { CreateAssignorInputDTO } from "@/@core/domain/dtos/assignor.dto";
import { Assignor } from "@/@core/domain/entities/assignor.entity";
import { IAssignorService } from "@/@core/domain/services/assignor.service.interface";
import { myContainer } from "@/@core/infra/dependecy-injection/inversify.config";
import { TYPES } from "@/@core/infra/dependecy-injection/types";
import { useState } from "react";
import { AssignorContext } from "./assignor.context";

const service = myContainer.get<IAssignorService>(TYPES.IAssignorService);

export const AssignorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [assignors, setAssignors] = useState<Assignor[]>([]);

  const createAssignor = async (data: CreateAssignorInputDTO) => {
    const result = await service.create(data);
    setAssignors([...assignors, result]);
    return result;
  };

  const getAssignor = async (id: string): Promise<Assignor | null> => {
    const result = await service.findById(id);
    return result;
  };

  const getAllAssignors = async (): Promise<Assignor[]> => {
    const result = await service.findAll();
    return result;
  };

  return (
    <AssignorContext.Provider
      value={{
        assignors: assignors,
        createAssignor,
        getAssignor,
        getAllAssignors,
      }}
    >
      {children}
    </AssignorContext.Provider>
  );
};
