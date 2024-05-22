import { z } from "zod";

export const authSchema = z.object({
  login: z.string().min(1, "login required"),
  password: z
    .string()
    .min(8, "password needs to be at least 8 characters long"),
});
export type AuthFormData = z.infer<typeof authSchema>;

export type AuthResponse = {
  token: string;
};

export const login = async (data: AuthFormData): Promise<AuthResponse> => {
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

export const singUp = async (data: AuthFormData): Promise<AuthFormData> => {
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
