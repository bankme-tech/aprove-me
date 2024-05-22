import { z } from 'zod';

export const authDto = z.object({
  email: z.string().email().min(1).max(140),
  password: z.string().min(1),
});

export type AuthDto = z.infer<typeof authDto>;
