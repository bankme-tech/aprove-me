import { UUID } from "crypto"
import { z } from "zod"

export type AssignorType = {
  id?: UUID,
  document: string,
  email: string,
  phone: string,
  name: string
}

export type PayableType = {
  id?: UUID,
  value: number,
  emissionDate: string,
  assignor?: UUID
}

const payableSchema = z.object({
  value: z.coerce.number().min(0.01),
  emissionDate: z.coerce.date(),
  assignor: z.string().optional(),
})
export { payableSchema }
export type PayableSchema = z.infer<typeof payableSchema>

const assignorSchema = z.object({
  document: z.string().max(30).min(1),
  email: z.string().email().max(140).min(1),
  phone: z.string().max(20).min(1),
  name: z.string().max(140).min(1)
})
export { assignorSchema }
export type AssignorSchema = z.infer<typeof assignorSchema>