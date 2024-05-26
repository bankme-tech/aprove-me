import z from "zod";

export const AuthInputSchema = z.object({
  login: z.string(),
  password: z.string(),
});
