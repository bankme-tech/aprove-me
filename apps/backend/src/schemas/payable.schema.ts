import { z } from 'zod';

export const createPayableSchema = z.object({
  value: z.number(),
  emissionDate: z.string().datetime(),
});

export type CreatePayableSchema = z.infer<typeof createPayableSchema>;
