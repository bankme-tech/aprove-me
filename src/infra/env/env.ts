import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRATION_TIME: z.string(),
  PORT: z.coerce.number().optional().default(3000),
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
