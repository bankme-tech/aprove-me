import { z } from 'zod';

export const createAssignorDto = z.object({
  document: z.string().min(1).max(30),
  email: z.string().email().min(1).max(140),
  phone: z.string().min(1).max(20),
  name: z.string().min(1).max(140),
});

export type CreateAssignorDto = z.infer<typeof createAssignorDto>;
