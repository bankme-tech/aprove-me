import { ICreateAssignor } from '@domain/assignor/interfaces/create-assignor.interface';

export interface ICreatePayable {
  readonly value: number;
  readonly emissionDate: string;
  readonly assignor: ICreateAssignor;
}
