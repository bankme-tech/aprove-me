import { z } from 'zod';

export const uuidDto = z.object({
  id: z.string().min(1).uuid(),
});

export type UuidDto = z.infer<typeof uuidDto>;
