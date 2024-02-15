import { Assignor } from '@prisma/client';
import { AssignorRepository } from '../assignor.repository';

export class InMemoryAssignorRepository implements AssignorRepository {
  public readonly assignors: Assignor[] = [];

  async findById(id: string): Promise<Assignor> {
    return this.assignors.find((assignor) => assignor.id === id);
  }

  async findByDocument(document: string): Promise<Assignor> {
    return this.assignors.find((assignor) => assignor.document === document);
  }

  async create(data: Assignor): Promise<Assignor> {
    this.assignors.push(data);

    return data;
  }
}
