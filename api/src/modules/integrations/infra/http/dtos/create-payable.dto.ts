import { z } from 'zod';

export const createPaybleDto = z.object({
  value: z.number().min(0),
  emissionDate: z.string().transform((value) => new Date(value)),
  assignor: z.string().uuid(),
});

export type CreatePayableDto = z.infer<typeof createPaybleDto>;
