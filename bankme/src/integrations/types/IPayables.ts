import { ID } from '.';

export interface IPayableValues {
  value: number;
  emissionDate: Date;
}

export interface IPayable extends ID, IPayableValues {
  assignorId: string;
}
