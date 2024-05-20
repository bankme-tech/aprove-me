import { uuidSchema } from 'src/common/zod';
import { z } from 'zod';

export const createPayableSchema = z.object({
  value: z.coerce.number(),
  emissionDate: z.string().date(),
  assignorId: uuidSchema,
});

export type CreatePayableDto = z.infer<typeof createPayableSchema>;
