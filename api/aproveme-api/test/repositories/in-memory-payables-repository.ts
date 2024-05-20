import { PayablesRepository } from "@/domain/receivables/application/repositories/payables-repository";
import { Payable } from "@/domain/receivables/enterprise/entities/payable";

export class InMemoryPayablesRepository implements PayablesRepository {
  public items: Payable[] = [];

  async create(payable: Payable): Promise<void> {
    this.items.push(payable);
  }

  async update(payable: Payable) {
    const itemIndex = this.items.findIndex((item) => item.id === payable.id);

    this.items[itemIndex] = payable;
  }

  async delete(payable: Payable): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === payable.id);

    this.items.splice(itemIndex, 1);
  }

  async findByid(id: string) {
    const payable = this.items.find((item) => item.id.toString() === id);

    if (!payable) return null;

    return payable;
  }
}
