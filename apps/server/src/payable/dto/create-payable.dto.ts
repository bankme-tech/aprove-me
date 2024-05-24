import { z } from 'zod'

export const payableCreateSchema = z.object({
  assignorId: z.string().uuid(),
  emissionDate: z.string(),
  value: z.number().min(1),
})

export const payableCreateSchemaBatch = z.array(payableCreateSchema)

export type PayableCreateSchema = z.infer<typeof payableCreateSchema>
export type PayableCreateSchemaBatch = z.infer<typeof payableCreateSchemaBatch>
