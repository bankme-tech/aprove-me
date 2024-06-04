import { InternalAxiosRequestConfig } from "axios";
import { IErrorResponse } from "./IErrorResponse";

export interface IError {
  message: string;
  name: string;
  code: string;
  config: InternalAxiosRequestConfig;
  request: object;
  response: IErrorResponse;
}
