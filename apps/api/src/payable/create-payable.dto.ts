import { z } from 'zod';

export const createPayableSchema = z.object({
  value: z.coerce.number(),
  emissionDate: z.string().date(),
  assignorId: z.string().uuid(),
});

export type CreatePayableDto = z.infer<typeof createPayableSchema>;
