import { z } from 'zod';

export const createPayableSchema = z.object({
  value: z.coerce.number(),
  emissionDate: z.string().datetime(),
  assignor_id: z.string().uuid(),
});

export type CreatePayableSchema = z.infer<typeof createPayableSchema>;
