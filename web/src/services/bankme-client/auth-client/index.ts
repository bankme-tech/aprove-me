import type { LoginSchema } from '@/schemas/auth/login-schema';
import { Client } from '@/services';
import type { UserModel } from '@/services/models/user-model';

export class AuthClient extends Client {
  constructor() {
    super('integrations/auth');
  }

  public async login(loginSchema: LoginSchema) {
    const { data } = await this.api.post<{
      user: UserModel;
      accessToken: string;
    }>('', loginSchema);
    return data;
  }
}
