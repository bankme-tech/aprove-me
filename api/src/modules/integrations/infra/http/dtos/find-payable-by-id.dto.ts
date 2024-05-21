import { z } from 'zod';

export const findPayableByIdDto = z.object({
  id: z.string().min(1).uuid(),
});

export type FindPayableByIdDto = z.infer<typeof findPayableByIdDto>;
