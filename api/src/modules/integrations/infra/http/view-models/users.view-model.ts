import { User } from '@/modules/integrations/domain/entities/user.entity';

export class UsersViewModel {
  public static toHTTP(user: User) {
    return {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
