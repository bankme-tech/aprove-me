import { ID } from '.';

export interface IPayableValues {
  value: number;
  emissionDate: Date;
  assignorId: string;
}

export interface IPayable extends ID, IPayableValues {}
