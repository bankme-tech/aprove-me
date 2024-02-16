import { Assignor } from '@prisma/client';
import { AssignorRepository } from '../assignor.repository';

export class InMemoryAssignorRepository implements AssignorRepository {
  public assignors: Assignor[] = [];

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

  async delete(id: string): Promise<void> {
    this.assignors = this.assignors.filter((assignor) => assignor.id !== id);
  }

  async update(id: string, data: Partial<Assignor>): Promise<Assignor> {
    const index = this.assignors.findIndex((assignor) => assignor.id === id);

    this.assignors[index] = Object.assign(this.assignors[index], data);

    return this.assignors[index];
  }
}
