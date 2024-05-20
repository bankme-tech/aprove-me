import { PayablesRepository } from "@/domain/receivables/application/repositories/payables-repository";
import { Payable } from "@/domain/receivables/enterprise/entities/payable";

export class InMemoryPayablesRepository implements PayablesRepository {
  public items: Payable[] = [];

  async create(payable: Payable): Promise<void> {
    this.items.push(payable);
  }
}
