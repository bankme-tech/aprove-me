import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(25),
  q: z.string().default(''),
});

export type PaginationSchema = z.infer<typeof paginationSchema>;
