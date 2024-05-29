"use client";

import { Payable } from "@/@core/domain/entities/payable.entity";
import { IPayableService } from "@/@core/domain/services/payable.service.interface";
import { myContainer } from "@/@core/infra/dependecy-injection/inversify.config";
import { TYPES } from "@/@core/infra/dependecy-injection/types";
import { useCallback, useState } from "react";
import { PayableContext } from "./payable.context";
import { CreatePayableInputDTO } from "@/@core/domain/dtos/payable.dto";
import { useAuth } from "../auth/use-auth";

const service = myContainer.get<IPayableService>(TYPES.IPayableService);

export const PayableProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [payables, setPayables] = useState<Payable[]>([]);
  const { isAuth } = useAuth();

  const refreshPayables = useCallback(async () => {
    if (!isAuth) return;
    const result = await service.findAll();
    setPayables(result);
  }, [isAuth]);

  const createPayable = async (data: CreatePayableInputDTO) => {
    const result = await service.create(data);
    await refreshPayables();
    return result;
  };

  const getPayable = async (id: string): Promise<Payable | null> => {
    const result = await service.findById(id);
    await refreshPayables();
    return result;
  };

  const getAllPayables = async (): Promise<Payable[]> => {
    const result = await service.findAll();
    setPayables(result);
    return result;
  };

  const updatePayable = async (id: string, data: CreatePayableInputDTO) => {
    await service.update(id, data);
    await refreshPayables();
  };

  const deletePayable = async (id: string) => {
    await service.delete(id);
    await refreshPayables();
  };

  return (
    <PayableContext.Provider
      value={{
        payables,
        createPayable,
        getPayable,
        getAllPayables,
        updatePayable,
        deletePayable,
      }}
    >
      {children}
    </PayableContext.Provider>
  );
};
