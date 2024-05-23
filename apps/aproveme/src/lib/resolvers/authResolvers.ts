import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "password needs to be at least 8 characters long"),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export type AuthResponse = {
  token: string;
};

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok && response.status === 401) {
    throw new Error("Wrong login or password");
  }

  return response.json();
};

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "name is required"),
  password: z
    .string()
    .min(8, "password needs to be at least 8 characters long"),
});
export type RegisterFormData = z.infer<typeof registerSchema>;

export const singUp = async (data: RegisterFormData): Promise<AuthResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok && response.status === 409) {
    throw new Error("Login already in use");
  }

  return response.json();
};
