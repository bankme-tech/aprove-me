import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(3, "Necessário pelo menos 3 caracteres")
    .max(140, "Máximo de caracteres atingidos"),

  password: z
    .string()
    .min(3, "Necessário pelo menos 3 caracteres")
    .max(140, "Máximo de caracteres atingidos"),
});

export type LoginTypes = z.infer<typeof loginSchema>;

export interface LoginResponse {
  accessToken: string;
}
