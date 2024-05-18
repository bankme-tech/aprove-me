import { z } from 'zod';

export const createPayableSchema = z.object({
  id: z.string().uuid(),
  value: z.coerce.number(),
  emissionDate: z.string().date(),
  assignorId: z.string().uuid(),
});

export type CreatePayableDto = z.infer<typeof createPayableSchema>;
