'use server';
import { cookies } from "next/headers";
import { getServerURL } from "./utils/getServerURL";

export async function login(formData: FormData) {
  const login = formData.get("login") as string;
  const password = formData.get("password") as string;
  const response = await fetch(`${getServerURL()}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });
  const { access_token: token } = await response.json();
  if (!token) return;
  const expires = new Date(Date.now() + 60 * 1000);
  cookies().set("token", token, { expires, httpOnly: false });
}

export async function logout() {
  cookies().set("token", "", { expires: new Date(0) });
}

export async function getToken() {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  return token;
}