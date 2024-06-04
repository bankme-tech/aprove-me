import { ICreateReceivable } from "interfaces/interfaces/Receivable/ICreateReceivable";
import { IListReceivable } from "interfaces/interfaces/Receivable/IListReceivable";
import { IReceivable } from "interfaces/interfaces/Receivable/IReceivable";
import { apiAuth } from "services/api.authentication";
import { ServiceEnum } from "services/service.enum";

enum MethodEnum {
  CREATE = "/",
  GET_ALL = "/",
  GET_BY_ID = "/by-id",
  UPDATE = "/",
  DELETE = "/"
}

const ReceivableMethod = {
  CREATE: `${ServiceEnum.RECEIVABLE}${MethodEnum.CREATE}`,
  GET_ALL: `${ServiceEnum.RECEIVABLE}${MethodEnum.GET_ALL}`,
  GET_BY_ID: `${ServiceEnum.RECEIVABLE}${MethodEnum.GET_BY_ID}`,
  UPDATE: `${ServiceEnum.RECEIVABLE}${MethodEnum.UPDATE}`,
  DELETE: `${ServiceEnum.RECEIVABLE}${MethodEnum.DELETE}`
};

export class ReceivableService {
  public static async create(data: ICreateReceivable): Promise<void> {
    await apiAuth.post(ReceivableMethod.CREATE, data);
  }

  public static async getAll(): Promise<IListReceivable[]> {
    const response = await apiAuth.get(ReceivableMethod.GET_ALL);
    const data: IListReceivable[] = response?.data;
    return data;
  }

  public static async getById(id: string): Promise<IReceivable> {
    const response = await apiAuth.get(
      `${ReceivableMethod.GET_BY_ID}?id=${id}`
    );
    const data: IReceivable = response?.data;
    return data;
  }

  public static async update(
    id: string,
    data: ICreateReceivable
  ): Promise<void> {
    await apiAuth.put(`${ReceivableMethod.UPDATE}${id}`, data);
  }

  public static async delete(id: string): Promise<void> {
    await apiAuth.delete(`${ReceivableMethod.DELETE}${id}`);
  }
}
