import { z } from 'zod';
import { phone as phoneValidator } from 'phone';
import { isValidCNPJ, isValidCPF } from '@brazilian-utils/brazilian-utils';

export const uuidSchema = z.string().uuid();

export const documentSchema = z
  .string()
  .refine((value) => isValidCPF(value) || isValidCNPJ(value));

export const phoneSchema = z.string().transform((value, ctx) => {
  const { phoneNumber, isValid } = phoneValidator(value, { country: 'BR' });
  if (!isValid) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'invalid phone number',
    });
  }

  return phoneNumber;
});
