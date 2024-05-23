import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
});

export type LoginSchema = z.infer<typeof loginSchema>;
