import { z } from 'zod';

export const createPayableSchema = z.object({
  value: z.number().min(0),
  emissionDate: z.date(),
  assignor: z.string().uuid(),
});

export type CreatePayableSchema = z.infer<typeof createPayableSchema>;
