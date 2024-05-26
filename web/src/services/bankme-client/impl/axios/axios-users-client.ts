import type { LoginSchema } from '@/schemas/auth/login-schema';
import type { UserModel } from '@/services/models/user-model';

import type { UsersClient } from '../../clients/users-client';
import { AxiosClient } from './axios-client';

export class AxiosUsersClient extends AxiosClient implements UsersClient {
  constructor() {
    super('integrations/users');
  }

  public async create(createUserSchema: LoginSchema) {
    const { data } = await this.api.post<UserModel>('', createUserSchema);
    return data;
  }
}
