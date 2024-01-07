import { z } from 'zod';

export const signInSchema = z.object({
  login: z.string().max(30),
  password: z.string().max(140),
});

export type SignInSchema = z.infer<typeof signInSchema>;
