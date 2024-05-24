import { PayableModel } from "./payable.model";

export class AssignorModel {
  id: string = '';
  document: string = '';
  email: string = '';
  phone: string = '';
  name: string = '';
  payables: PayableModel[] = [];
}
