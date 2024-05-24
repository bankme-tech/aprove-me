import { AssignorModel } from './assignor.model';

export class PayableModel {
  id: string = '';
  value: number = 0;
  emissionDate: string = '';
  assignorEmail: string = '';
  assignor: AssignorModel = {} as AssignorModel;
  assignorId: string = '';
}
