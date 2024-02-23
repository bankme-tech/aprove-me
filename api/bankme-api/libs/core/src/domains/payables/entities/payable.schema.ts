import { z } from 'zod';
import { Fails } from 'bme/core/messages/fails';
import { BasicValidations } from 'bme/core/basic-validations';

export const createPayableSchema = z.object({
  value: z.coerce.number(),
  emissionDate: z
    .string()
    .datetime()
    .refine((x) => BasicValidations.isValidDate(x)),
  assignorId: z.string().uuid().optional(),
  assignor: z
    .object({
      document: z
        .string()
        .max(30)
        .refine((x) => BasicValidations.isValidCNPJOrCPF(x), {
          message: Fails.INVALID_DOCUMENT,
        }),
      email: z.string().max(140).email(),
      phone: z.string().max(20),
      name: z.string().max(140),
    })
    .optional(),
});

const myString = z.string().refine((val) => val.length <= 255, {
  message: "String can't be more than 255 characters",
});
