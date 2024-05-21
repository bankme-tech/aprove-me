import { api } from "@/lib/api";
import { LoginResponse, LoginTypes } from "@/types/login";

export class AuthService {
  static async login(loginData: LoginTypes): Promise<LoginResponse> {
    try {
      const { data } = await api.post<LoginResponse>(
        "/integrations/user/login",
        loginData,
      );

      return data;
    } catch (error) {
      console.error(error);
      return { accessToken: "" };
    }
  }

  static async signup(signUpData: LoginTypes): Promise<void> {
    await api.post<LoginResponse>("/integrations/user", signUpData);
  }
}
