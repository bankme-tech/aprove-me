import axios from "axios";
import { BASE_URL } from "../../api";

const AUTH_ENDPOINT = BASE_URL + "/integrations/auth";

const authService = {
  async signIn({ login, password }: { login: string; password: string }) {
    return axios.post<{
      access_token: string;
    }>(`${AUTH_ENDPOINT}`, {
      login,
      password,
    });
  },
};

export default authService;
