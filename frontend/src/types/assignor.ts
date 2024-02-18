import { z } from 'zod';

const phoneRegex =
  /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;

export const assignorSchema = z.object({
  document: z.string().min(11).max(14),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, 'Número Inválido'),
  name: z.string().max(30).min(2),
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
