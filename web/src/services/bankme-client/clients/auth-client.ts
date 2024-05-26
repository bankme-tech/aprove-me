import type { LoginSchema } from '@/schemas/auth/login-schema';
import type { UserModel } from '@/services/models/user-model';

export abstract class AuthClient {
  public abstract login(loginSchema: LoginSchema): Promise<{
    user: UserModel;
    accessToken: string;
  }>;
}
