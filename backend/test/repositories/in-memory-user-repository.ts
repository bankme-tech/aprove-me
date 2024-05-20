import { User } from '@/app/entities/user';
import { UserRepository } from '@/app/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  public user: User[] = [];

  public async create(user: User): Promise<User> {
    this.user.push(user);

    return user;
  }
  public async findByLogin(userLogin: string): Promise<User> {
    return this.user.find((user) => user.props.login === userLogin);
  }
}
