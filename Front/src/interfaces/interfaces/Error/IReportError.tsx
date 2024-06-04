import { IMethod } from "../Service/IMethod";

export interface IReportError extends IMethod {
  message: string;
  status: number;
}
