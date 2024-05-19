import { IAssignorValues } from './IAssignor';
import { IPayableValues } from './IPayables';

export interface ID {
  id: string;
}

export interface IPayableCreation extends IPayableValues {}

export interface IAssignorCretion extends IAssignorValues {}
