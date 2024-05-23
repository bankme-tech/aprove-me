import { z } from 'zod'

export const assignorCreateSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(140, 'The name field cannot be longer than 140 characters.'),
  document: z
    .string()
    .min(11)
    .max(30, 'The document field cannot be longer than 30 characters.'),
  email: z
    .string()
    .min(12)
    .max(140, 'The email field cannot be longer than 140 characters.'),
  phone: z
    .string()
    .min(11)
    .max(20, 'The phone field cannot be longer than 20 characters.'),
})

export type AssignorCreateSchema = z.infer<typeof assignorCreateSchema>
