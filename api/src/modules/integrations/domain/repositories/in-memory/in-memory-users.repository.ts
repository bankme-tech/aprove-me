import { InMemoryRepository } from '@/core/domain/respositories/in-memory.repository';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';

export class InMemoryUsersRepository
  extends InMemoryRepository<User>
  implements UsersRepository
{
  public async findByLogin(login: string): Promise<User | null> {
    const entity = this.entities.find((item) => item.login === login) || null;

    return entity;
  }
}
