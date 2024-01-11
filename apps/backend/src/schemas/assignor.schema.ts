import { z } from 'zod';

export const createAssignorSchema = z.object({
  document: z.string().max(30).min(1),
  email: z.string().max(140).min(1),
  phone: z.string().max(20).min(1),
  name: z.string().max(140).min(1),
});

export type CreateAssignorSchema = z.infer<typeof createAssignorSchema>;
