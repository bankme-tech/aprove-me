import { z } from 'zod';

export const signInSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export type SignInDto = z.infer<typeof signInSchema>;
