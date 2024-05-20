import { User } from '@/app/entities/user';

export abstract class UserRepository {
  public abstract create(user: User): Promise<User>;
}
