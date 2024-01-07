import { z } from 'zod';

export const createAssignorSchema = z.object({
  document: z.string().max(30),
  email: z.string().max(140),
  phone: z.string().max(20),
  name: z.string().max(140),
});

export type CreateAssignorSchema = z.infer<typeof createAssignorSchema>;
