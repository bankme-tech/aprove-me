import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRATION_TIME: z.string(),
  PORT: z.coerce.number().optional().default(3000),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number().default(6379),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_AUTH_USER: z.string(),
  MAIL_AUTH_USER_PASSWORD: z.string(),
});

export const validateEnv = (env: Record<string, any>) => {
  const _env = envSchema.safeParse(env);

  if (!_env.success) {
    console.error('Invalid environment variables');

    throw new Error('Invalid environment variables');
  }

  return _env.data;
};

export type Env = z.infer<typeof envSchema>;
