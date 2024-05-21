import { z } from 'zod';
import { documentSchema, phoneSchema } from '../../common/zod';

export const updateAssignorSchema = z.object({
  document: documentSchema.optional(),
  email: z.string().email().optional(),
  phone: phoneSchema.optional(),
  name: z.string().optional(),
});

export type UpdateAssignorDto = z.infer<typeof updateAssignorSchema>;
