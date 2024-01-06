import { z } from 'zod';

export const createCatSchema = z.object({
  id: z.string().uuid(),
  value: z.number(),
  emissionDate: z.date(),
  assignor: z.object({
    document: z.string().max(30),
    email: z.string().max(140),
    phone: z.string().max(20),
    name: z.string().max(140),
  }),
});

export type CreateCatDto = z.infer<typeof createCatSchema>;
