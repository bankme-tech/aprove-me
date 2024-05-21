import { api } from "@/lib/api";

interface LoginProps {
  login: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export class AuthService {
  static async login(loginData: LoginProps): Promise<LoginResponse> {
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

  static async signup(signUpData: LoginProps): Promise<void> {
    await api.post<LoginResponse>("/integrations/user", signUpData);
  }
}
