import { ID } from '.';

export interface IAssignorValues {
  document: string;
  email: string;
  phone: string;
  name: string;
}

export interface IAssignor extends ID, IAssignorValues {}
