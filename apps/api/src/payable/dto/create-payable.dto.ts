import { z } from 'zod';
import { uuidSchema } from '../../common/zod';

export const createPayableSchema = z.object({
  value: z.coerce.number().min(0.1),
  emissionDate: z.string().date(),
  assignorId: uuidSchema,
});

export type CreatePayableDto = z.infer<typeof createPayableSchema>;
