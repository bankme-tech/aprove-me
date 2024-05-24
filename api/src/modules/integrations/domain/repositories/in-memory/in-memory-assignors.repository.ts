import { InMemoryRepository } from '@/core/domain/respositories/in-memory.repository';
import { AssignorsRepository } from '../assignors.repository';
import { Assignor } from '../../entities/assignor.entity';

export class InMemoryAssignorsRepository
  extends InMemoryRepository<Assignor>
  implements AssignorsRepository
{
  public async findByEmail(email: string): Promise<Assignor | null> {
    const entity = this.entities.find((item) => item.email === email) || null;

    return entity;
  }
}
