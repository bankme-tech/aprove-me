import { Payable } from '@prisma/client';
import {
  PayableRepository,
  PayableWithAssignorName,
} from '../payable.repository';

export class InMemoryPayableRepository implements PayableRepository {
  public payables: Payable[] = [];

  async findById(id: string): Promise<Payable> {
    return this.payables.find((payable) => payable.id === id);
  }

  async findByIdWithAssignorName(id: string): Promise<PayableWithAssignorName> {
    const payable = this.payables.find((payable) => payable.id === id);

    if (payable) {
      return {
        ...payable,
        assignor: {
          name: payable.assignorId,
        },
      };
    }
    return null;
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

  async update(id: string, data: Partial<Payable>): Promise<Payable> {
    const index = this.payables.findIndex((payable) => payable.id === id);

    this.payables[index] = Object.assign(this.payables[index], data);

    return this.payables[index];
  }
}
