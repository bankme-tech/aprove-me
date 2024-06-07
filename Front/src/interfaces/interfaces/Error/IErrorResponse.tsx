export interface IErrorResponse {
  data: IData;
}

interface IData {
  message: string | string[];
  statusCode: number;
}
