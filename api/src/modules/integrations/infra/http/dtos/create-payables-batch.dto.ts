import { z } from 'zod';
import { createPayableDto } from './create-payable.dto';

export const createPayablesBatchDto = z.object({
  payables: z.array(createPayableDto),
});

export type CreatePayablesBatchDto = z.infer<typeof createPayablesBatchDto>;
