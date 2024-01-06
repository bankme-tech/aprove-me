import { z } from 'zod';

export const createPayableWithAssignorSchema = z
  .object({
    value: z.number(),
    emissionDate: z.string().datetime(),
    assignor: z
      .object({
        document: z.string().max(30),
        email: z.string().max(140),
        phone: z.string().max(20),
        name: z.string().max(140),
      })
      .required(),
  })
  .required();

export type CreatePayableWithAssignorDto = z.infer<
  typeof createPayableWithAssignorSchema
>;
