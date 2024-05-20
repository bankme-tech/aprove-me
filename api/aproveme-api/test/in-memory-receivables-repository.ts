import { ReceivablesRepository } from "@/domain/receivables/application/repositories/receivables-repository";
import { Assignor } from "@/domain/receivables/enterprise/entities/assignor";
import { Receivable } from "@/domain/receivables/enterprise/entities/receivable";
import { ReceivableWithAssignor } from "@/domain/receivables/enterprise/entities/value-object/receivable-with-assignor";

export class InMemoryReceivablesRepository implements ReceivablesRepository {
  public items: ReceivableWithAssignor[] = [];
  public receivables: Receivable[] = [];
  public assignors: Assignor[] = [];

  async create(receivable: Receivable, assignor: Assignor): Promise<void> {
    const receivableItem = ReceivableWithAssignor.create({
      receivableId: receivable.id,
      value: receivable.value,
      emissionDate: receivable.emissionDate,
      assignor: {
        id: assignor.id,
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
    });

    this.items.push(receivableItem);
    this.receivables.push(receivable);
    this.assignors.push(assignor);
  }
}
