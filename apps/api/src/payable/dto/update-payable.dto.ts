import { z } from 'zod';

export const updatePayableSchema = z.object({
  value: z.coerce.number().optional(),
  emissionDate: z.string().date().optional(),
});

export type UpdatePayableDto = z.infer<typeof updatePayableSchema>;
