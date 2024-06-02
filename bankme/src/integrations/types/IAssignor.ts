import { ID } from '.';

export interface IAssignorValues {
  document: string;
  email: string;
  phone: string;
  name: string;
  active: boolean;
}

export interface IAssignor extends ID, IAssignorValues {}
