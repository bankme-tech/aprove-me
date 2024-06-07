import { MethodEnumType } from "interfaces/enum/MethodEnum";

export interface IErrorLog {
  id: number;
  status: number;
  message: string;
  method: MethodEnumType;
  endpoint: string;
  author: string;
  roles: string;
  createDate: Date;
}
