import { Payable } from "../entities/payable.entity";

export type CreatePayableInputDTO = Pick<
  Payable,
  "value" | "emissionDate" | "assignorId"
>;

export type CreatePayableOutputDTO = Payable;

export type FindPayableOutputDTO = Payable;

export type UpdatePayableInputDTO = CreatePayableInputDTO;

export type UpdatePayableOutputDTO = Payable;
