import { IUserCredentials } from "interfaces/interfaces/User/IUserCredentials";
import { api } from "services/api";
import { apiAuth } from "services/api.authentication";
import { ServiceEnum } from "../service.enum";

enum MethodEnum {
  LOGIN = "/login",
  REGISTER = "/login",
  VERIFY_TOKEN = "/verify-token"
}

const AuthMethod = {
  LOGIN: `${ServiceEnum.AUTH}${MethodEnum.LOGIN}`,
  VERIFY_TOKEN: `${ServiceEnum.AUTH}${MethodEnum.VERIFY_TOKEN}`
};

export class AuthService {
  public static async login(
    login: string,
    password: string
  ): Promise<IUserCredentials> {
    const response = await api.post(AuthMethod.LOGIN, {
      login,
      password
    });

    const accessToken = response?.data?.accessToken;
    const user = response?.data?.user;

    return { accessToken, user };
  }

  public static async verifyToken(): Promise<void> {
    await apiAuth.get(AuthMethod.VERIFY_TOKEN);
  }
}
