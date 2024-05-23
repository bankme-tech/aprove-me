import { z } from 'zod'

export const loginValidationSchema = z.object({
    login: z.string({required_error: 'Login é obrigatório'}),
    password: z.string({required_error: 'Senha é obrigatória'})
})

export type LoginData = z.infer<typeof loginValidationSchema>