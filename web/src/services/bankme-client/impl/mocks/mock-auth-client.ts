import type { UserModel } from '@/services/models/user-model';

import type { AuthClient } from '../../clients/auth-client';

export class MockAuthClient implements AuthClient {
  public async login(loginSchema: {
    login: string;
    password: string;
  }): Promise<{ user: UserModel; accessToken: string }> {
    return {
      user: {
        id: '221a805d-dade-4a15-8461-d93a86e53957',
        login: loginSchema.login,
        createdAt: new Date(1970, 3, 1),
        updatedAt: new Date(1970, 3, 1),
      },
      accessToken: 'acessToken',
    };
  }
}
