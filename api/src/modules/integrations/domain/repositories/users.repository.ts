import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  public abstract save(user: User): Promise<User>;
  public abstract findById(id: string): Promise<User | null>;
  public abstract findByLogin(login: string): Promise<User | null>;
}
