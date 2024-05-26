import type { LoginSchema } from '@/schemas/auth/login-schema';
import type { UserModel } from '@/services/models/user-model';

export abstract class UsersClient {
  public abstract create(createUserSchema: LoginSchema): Promise<UserModel>;
}
