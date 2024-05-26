import type { LoginSchema } from '@/schemas/auth/login-schema';
import type { UserModel } from '@/services/models/user-model';

import type { AuthClient } from '../../clients/auth-client';
import { AxiosClient } from './axios-client';

export class AxiosAuthClient extends AxiosClient implements AuthClient {
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
