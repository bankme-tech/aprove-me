import { z } from 'zod';

export const createAssignorSchema = z.object({
  document: z.string().min(0).max(30),
  email: z.string().min(0).email().max(140),
  phone: z.string().min(0).max(20),
  name: z.string().max(140),
});

export type CreateAssignorSchema = z.infer<typeof createAssignorSchema>;
