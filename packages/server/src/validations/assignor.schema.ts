import { z } from 'zod';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const cpfOrCnpj = z
  .string({
    message: 'Invalid CPF or CNPJ',
  })
  .max(30, 'CPF or CNPJ cannot be more than 30 characters')
  .refine((value) => cpf.isValid(value) || cnpj.isValid(value), {
    message: 'Invalid CPF or CNPJ',
  });

const brazilianPhone = z
  .string({
    message: 'Invalid  phone number',
  })
  .max(20, 'Phone number cannot be more than 20 characters')
  .refine((value) => value.length === 11, {
    message: 'Invalid  phone number',
  });

export const assignorSchema = z
  .object({
    document: cpfOrCnpj,
    email: z
      .string({
        message: 'Invalid email format',
      })
      .max(140, 'Email cannot be more than 140 characters')
      .email('Invalid email format'),
    phone: brazilianPhone,
    name: z
      .string({
        message: 'Invalid name',
      })
      .max(140, 'Name cannot be more than 140 characters')
      .min(3, 'Name cannot be empty'),
    receivables: z.array(z.any()).optional(),
  })
  .required({
    document: true,
    email: true,
    phone: true,
    name: true,
  });

export const updateAssignorSchema = z.object({
  document: cpfOrCnpj.optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: brazilianPhone.optional(),
  name: z.string().min(1, 'Name cannot be empty').optional(),
});
