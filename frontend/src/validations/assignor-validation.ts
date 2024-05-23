import { z } from 'zod'

export const assignorValidationSchema = z.object({
    name: z.string({required_error: 'Nome é obrigatório'}).max(140, {message: 'Nome deve ter no máximo 140 caracteres'}),
    document: z.string({required_error: 'Documento é obrigatório'}).max(30, {message: 'Documento deve ter no máximo 30 caracteres'}),
    email: z.string({required_error: 'Email é obrigatório'}).email({message: 'Email inválido'}).max(140, {message: 'Email deve ter no máximo 140 caracteres'}),
    phone: z.string({required_error: 'Telefone é obrigatório'}).max(20, {message: 'Telefone deve ter no máximo 20 caracteres'}),
})

export type AssignorData = z.infer<typeof assignorValidationSchema>