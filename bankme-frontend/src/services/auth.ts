import { api } from "@/lib/axios";

export async function signIn({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  const res = await api.post<{ access_token: string }>("/auth", {
    login,
    password,
  });
  return res.data;
}
