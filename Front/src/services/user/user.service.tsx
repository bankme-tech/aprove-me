import { api } from "services/api";
import { ServiceEnum } from "../service.enum";

enum MethodEnum {
  REGISTER = "/"
}

const UserMethod = {
  REGISTER: `${ServiceEnum.USER}${MethodEnum.REGISTER}`
};

export class UserService {
  public static async register(login: string, password: string): Promise<void> {
    await api.post(UserMethod.REGISTER, {
      login,
      password
    });
  }
}
