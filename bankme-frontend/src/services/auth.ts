import { api } from "@/lib/axios";
import { CredentialsSchemaType } from "@/schemas/credentials-schema";

export async function signIn({ login, password }: CredentialsSchemaType) {
  const res = await api.post<{ access_token: string }>("/auth", {
    login,
    password,
  });
  return res.data;
}

export async function register({ login, password }: CredentialsSchemaType) {
  const res = await api.post("/auth/register", {
    login,
    password,
  });
  return res.data;
}
