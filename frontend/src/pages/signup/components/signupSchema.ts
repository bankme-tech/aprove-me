import { z } from "zod";

export const signupSchema = z
  .object({
    login: z
      .string()
      .min(3, "Necessário pelo menos 3 caracteres")
      .max(140, "Máximo de caracteres atingidos"),

    password: z
      .string()
      .min(3, "Necessário pelo menos 3 caracteres")
      .max(140, "Máximo de caracteres atingidos"),
    samePassword: z
      .string()
      .min(3, "Necessário pelo menos 3 caracteres")
      .max(140, "Máximo de caracteres atingidos"),
  })
  .refine((inputs) => inputs.password === inputs.samePassword, {
    path: ["samePassword"],
    message: "Senhas precisam ser idênticas",
  });

export type SignupTypes = z.infer<typeof signupSchema>;
