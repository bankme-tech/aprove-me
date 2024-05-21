import { z } from 'zod';
import { documentSchema, phoneSchema } from '../../common/zod';

export const createAssignorSchema = z.object({
  document: documentSchema,
  email: z.string().email(),
  phone: phoneSchema,
  name: z.string(),
});

export type CreateAssignorDto = z.infer<typeof createAssignorSchema>;
