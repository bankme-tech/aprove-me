import { z } from 'zod';

export const authSchema = z.object({
  login: z.string(),
  password: z.string().min(8),
});

export type AuthDto = z.infer<typeof authSchema>;
