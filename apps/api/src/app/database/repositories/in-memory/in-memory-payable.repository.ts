import { Payable } from '@prisma/client';
import { PayableRepository } from '../payable.repository';

export class InMemoryPayableRepository implements PayableRepository {
  public payables: Payable[] = [];

  async findById(id: string): Promise<Payable> {
    return this.payables.find((payable) => payable.id === id);
  }

  async findByAssignor(assignorId: string): Promise<Payable[]> {
    return this.payables.filter((payable) => payable.assignorId === assignorId);
  }

  async create(data: Payable): Promise<Payable> {
    this.payables.push(data);

    return data;
  }

  async delete(id: string): Promise<void> {
    this.payables = this.payables.filter((payable) => payable.id !== id);
  }

  async findAll(): Promise<Payable[]> {
    return this.payables;
  }
}
