import { z } from 'zod'

export const payableCreateSchema = z.object({
  assignorId: z.string().uuid(),
  emissionDate: z.string(),
  value: z.number().min(1),
})

export type PayableCreateSchema = z.infer<typeof payableCreateSchema>
