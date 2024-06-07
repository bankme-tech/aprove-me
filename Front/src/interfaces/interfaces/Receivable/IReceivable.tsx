import { IAssignor } from "../Assignor/IAssignor";

export interface IReceivable {
  assignor: IAssignor;
  assignorId: string;
  emissionDate: Date;
  value: string;
}
