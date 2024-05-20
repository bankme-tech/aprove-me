import { PayablesRepository } from "@/domain/receivables/application/repositories/payables-repository";
import { Assignor } from "@/domain/receivables/enterprise/entities/assignor";
import { Payable } from "@/domain/receivables/enterprise/entities/payable";
import { PayableWithAssignor } from "@/domain/receivables/enterprise/entities/value-object/receivable-with-assignor";

export class InMemoryPayablesRepository implements PayablesRepository {
  public items: PayableWithAssignor[] = [];
  public payables: Payable[] = [];
  public assignors: Assignor[] = [];

  async create(payable: Payable, assignor: Assignor): Promise<void> {
    const payableItem = PayableWithAssignor.create({
      payableId: payable.id,
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignor: {
        id: assignor.id,
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
    });

    this.items.push(payableItem);
    this.payables.push(payable);
    this.assignors.push(assignor);
  }
}
