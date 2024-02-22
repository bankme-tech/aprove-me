import { z } from 'zod';

export const createPayableSchema = z.object({
  value: z.coerce.number(),
  emissionDate: z.string().datetime(),
  assignorId: z.string().uuid().optional(),
  assignor: z
    .object({
      document: z.string().max(30),
      email: z.string().max(140),
      phone: z.string().max(20),
      name: z.string().max(140),
    })
    .optional(),
});
