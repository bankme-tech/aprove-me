import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_ISSUER: z.string(),
  JWT_AUDIENCE: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.number({ coerce: true }),
})

export const env = envSchema.parse(process.env)
