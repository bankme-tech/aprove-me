import { z } from 'zod';
import { isValidCNPJ, isValidCPF } from '@brazilian-utils/brazilian-utils';
import { phone as phoneValidator } from 'phone';

export const createAssignorSchema = z.object({
  document: z
    .string()
    .refine((value) => isValidCPF(value) || isValidCNPJ(value)),
  email: z.string().email(),
  phone: z.string().transform((value, ctx) => {
    const { phoneNumber, isValid } = phoneValidator(value, { country: 'BR' });
    if (!isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'invalid phone number',
      });
    }

    return phoneNumber;
  }),
  name: z.string(),
});

export type CreateAssignorDto = z.infer<typeof createAssignorSchema>;
