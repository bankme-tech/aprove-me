import { z } from 'zod';

export const patchAssignorDto = z
  .object({
    document: z.string().min(1).max(30).optional(),
    email: z.string().email().min(1).max(140).optional(),
    phone: z.string().min(1).max(20).optional(),
    name: z.string().min(1).max(140).optional(),
  })
  .refine((data) => Object.keys(data).length !== 0, {
    message: 'At least one property should be sent',
    path: ['body'],
  });

export type PatchAssignorDto = z.infer<typeof patchAssignorDto>;
