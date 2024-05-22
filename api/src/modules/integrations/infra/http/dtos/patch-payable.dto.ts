import { z } from 'zod';

export const patchPayableDto = z
  .object({
    value: z.number().min(0).optional(),
    emissionDate: z.coerce.date().optional(),
    assignor: z.string().uuid().optional(),
  })
  .refine((data) => Object.keys(data).length !== 0, {
    message: 'At least one property should be sent',
    path: ['body'],
  });

export type PatchPayableDto = z.infer<typeof patchPayableDto>;
