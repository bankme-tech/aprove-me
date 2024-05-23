import { z } from 'zod'

export const payableValidationSchema = z.object({
    value: z.coerce.number({required_error: 'Valor é obrigatório'}).positive({message: 'Valor deve ser positivo'}),
    emissionDate: z.date({required_error: 'Data de emissão é obrigatória'}),
    assignorId: z.string({required_error: 'Cedente é obrigatório'}).uuid({message: 'Cedente inválido'}),
})

export type PayableData = z.infer<typeof payableValidationSchema>