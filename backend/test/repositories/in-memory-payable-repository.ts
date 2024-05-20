import { Payable } from '@/app/entities/payable';
import { PayableRepository } from '@/app/repositories/payable.repository';

export class InMemoryPayableRepository implements PayableRepository {
  public payable: Payable[] = [];

  async create(payable: Payable): Promise<Payable> {
    this.payable.push(payable);

    return payable;
  }

  async findById(payableId: string): Promise<Payable> {
    return this.payable.find((pay) => pay._id === payableId);
  }

  async edit(payable: Payable): Promise<Payable> {
    const payableIndex = this.payable.findIndex(
      (item) => item._id === payable._id,
    );

    if (payableIndex >= 0) {
      this.payable[payableIndex] = payable;
      return this.payable[payableIndex];
    }
  }

  async delete(payableId: string): Promise<void> {
    const payableRemoved = this.payable.filter((pay) => pay._id !== payableId);

    this.payable = payableRemoved;
  }
}
