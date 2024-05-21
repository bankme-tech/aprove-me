import { z } from 'zod';

export const createPayableDto = z.object({
  value: z.number().min(0),
  emissionDate: z.coerce.date(),
  assignor: z.string().uuid(),
});

export type CreatePayableDto = z.infer<typeof createPayableDto>;
