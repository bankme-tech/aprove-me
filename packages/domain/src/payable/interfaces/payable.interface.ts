import { IAssignor } from '../../assignor';
import { Id } from '../../shared';

export interface IPayable {
  readonly id: Id;
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignor: IAssignor;
}
