import { IAssignor } from "interfaces/interfaces/Assignor/IAssignor";
import { ICreateAssignor } from "interfaces/interfaces/Assignor/ICreateAssignor";
import { apiAuth } from "services/api.authentication";
import { ServiceEnum } from "services/service.enum";

enum MethodEnum {
  CREATE = "/",
  GET_ALL = "/",
  GET_BY_ID = "/by-id",
  UPDATE = "/",
  DELETE = "/"
}

const AssignorMethod = {
  CREATE: `${ServiceEnum.ASSIGNOR}${MethodEnum.CREATE}`,
  GET_ALL: `${ServiceEnum.ASSIGNOR}${MethodEnum.GET_ALL}`,
  GET_BY_ID: `${ServiceEnum.ASSIGNOR}${MethodEnum.GET_BY_ID}`,
  UPDATE: `${ServiceEnum.ASSIGNOR}${MethodEnum.UPDATE}`,
  DELETE: `${ServiceEnum.ASSIGNOR}${MethodEnum.DELETE}`
};

export class AssignorService {
  public static async create(data: ICreateAssignor): Promise<void> {
    await apiAuth.post(AssignorMethod.CREATE, data);
  }

  public static async getAll(): Promise<IAssignor[]> {
    const response = await apiAuth.get(AssignorMethod.GET_ALL);
    const data: IAssignor[] = response?.data;
    return data;
  }

  public static async getById(id: string): Promise<IAssignor> {
    const response = await apiAuth.get(`${AssignorMethod.GET_BY_ID}?id=${id}`);
    const data: IAssignor = response?.data;
    return data;
  }

  public static async update(id: string, data: ICreateAssignor): Promise<void> {
    await apiAuth.put(`${AssignorMethod.UPDATE}${id}`, data);
  }

  public static async delete(id: string): Promise<void> {
    await apiAuth.delete(`${AssignorMethod.DELETE}${id}`);
  }
}
