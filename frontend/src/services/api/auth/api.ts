import { api } from "../apiService";
import AuthGateway from "./interfaces/AuthGateway";

export class APIAuthService implements AuthGateway {
    async signIn(login: string, password: string): Promise<{ access_token: string }> {
        const response = await api.post("/auth/login", { login, password });
        return response.data;
    }
}