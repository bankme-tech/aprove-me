import { z } from 'zod';

export const createUserDto = z.object({
  login: z.string().min(1).max(140),
  password: z.string().min(1),
});

export type CreateUserDto = z.infer<typeof createUserDto>;
