import { z } from 'zod';

export const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AuthenticateDto = z.infer<typeof authenticateSchema>;
