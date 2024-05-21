import { z } from 'zod';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const cpfOrCnpj = z.string().refine((value) => cpf.isValid(value) || cnpj.isValid(value), {
  message: 'Invalid CPF or CNPJ',
});

const brazilianPhone = z.string().refine((value) => /^(\+55)?\d{10,11}$/.test(value), {
  message: 'Invalid Brazilian phone number',
});

export const assignorSchema = z.object({
  id: z.string().uuid().optional(),
  document: cpfOrCnpj,
  email: z.string().email('Invalid email format'),
  phone: brazilianPhone,
  name: z.string().min(1, 'Name cannot be empty'),
  receivables: z.array(z.any()).optional(),
});
