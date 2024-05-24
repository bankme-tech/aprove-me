import dayjs from 'dayjs';
import { z } from 'zod';

export const createPayableSchema = z.object({
  value: z
    .string()
    .min(0)
    .transform(Number)
    .refine((value) => !Number.isNaN(value), {
      message: 'Value must be a number',
    }),
  emissionDate: z.string().transform((stringDate) => {
    const date = dayjs(stringDate);
    return date.toDate();
  }),
  assignor: z.string().uuid(),
});

export type CreatePayableSchema = z.infer<typeof createPayableSchema>;
