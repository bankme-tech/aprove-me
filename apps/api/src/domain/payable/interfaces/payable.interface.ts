import { IAssignor } from '@domain/assignor/interfaces/assignor.interface';
import { Id } from '@domain/shared/id';

export interface IPayable {
  readonly id: Id;
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignor: IAssignor;
}
