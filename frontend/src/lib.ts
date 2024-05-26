import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authService } from "./services/api/auth";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function login(formData: FormData) {
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;
    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
    });
    const { access_token: token } = await response.json();
    if (!token) return;
    const expires = new Date(Date.now() + 60 * 1000);
    cookies().set("token", token, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("token", "", { expires: new Date(0) });
}

export async function getToken() {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  return token;
}