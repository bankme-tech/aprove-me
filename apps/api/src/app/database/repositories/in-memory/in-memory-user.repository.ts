import { User } from '@prisma/client';
import { UserRepository } from '../user.repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findByUsername(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }

  async create(data: User): Promise<User> {
    this.users.push(data);

    return data;
  }
}
