export interface IErrorResponse {
  data: IData;
}

interface IData {
  message: string;
  statusCode: number;
}
