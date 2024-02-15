import { CreateAssignorDto } from 'src/domain/dtos';
import { Assignor } from 'src/domain/entities';
import { AssignorRepository } from 'src/repositories';

export class InMemoryAssignorRepository implements AssignorRepository {
  public items: Assignor[] = [];

  async create(createAssignorDto: CreateAssignorDto): Promise<Assignor> {
    const assignor = Assignor.create(createAssignorDto);

    this.items.push(assignor);

    return assignor;
  }

  async findById(id: string) {
    return null;
  }

  async delete(id: string): Promise<void> {
    return null;
  }
}
