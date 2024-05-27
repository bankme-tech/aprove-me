"use client";

import { Payable } from "@/@core/domain/entities/payable.entity";
import { IPayableService } from "@/@core/domain/services/payable.service.interface";
import { myContainer } from "@/@core/infra/dependecy-injection/inversify.config";
import { TYPES } from "@/@core/infra/dependecy-injection/types";
import { useState } from "react";
import { PayableContext } from "./payable.context";
import { CreatePayableInputDTO } from "@/@core/domain/dtos/payable.dto";

const service = myContainer.get<IPayableService>(TYPES.IPayableService);

export const PayableProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [payables, setPayables] = useState<Payable[]>([]);

  const createPayable = async (data: CreatePayableInputDTO) => {
    const result = await service.create(data);
    setPayables([...payables, result]);
    return result;
  };

  const getPayable = async (id: string): Promise<Payable | null> => {
    const result = await service.findById(id);
    return result;
  };

  return (
    <PayableContext.Provider value={{ payables, createPayable, getPayable }}>
      {children}
    </PayableContext.Provider>
  );
};
