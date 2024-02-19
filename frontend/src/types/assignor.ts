import { z } from 'zod';

const phoneRegex =
  /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;

export const assignorSchema = z.object({
  document: z
    .string({
      required_error: 'Digite um número de documento',
    })
    .min(11, {
      message: 'CPNJ e CPF precisa ter o mínimo de 11 dígitos',
    })
    .max(14, {
      message: 'Tamanho de CPF e CPNJ inválido',
    }),
  email: z
    .string({
      required_error: 'Digite um email',
    })
    .email({
      message: 'Email inválido',
    }),
  phone: z
    .string({
      required_error: 'Digite um telefone',
    })
    .regex(phoneRegex, 'Número Inválido'),
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .min(2, {
      message: 'Nome precisa ser maior que 2 caracteres',
    })
    .max(30, { message: 'Máximo de 30 caracteres' }),
});

export type AssignorSchema = z.infer<typeof assignorSchema>;

export interface Assignor {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
