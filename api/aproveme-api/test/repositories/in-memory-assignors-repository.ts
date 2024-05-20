import { AssignorsRepository } from "@/domain/receivables/application/repositories/assignors-repository";
import { Assignor } from "@/domain/receivables/enterprise/entities/assignor";

export class InMemoryAssignorsRepository implements AssignorsRepository {
  public items: Assignor[] = [];

  async create(assignor: Assignor): Promise<void> {
    this.items.push(assignor);
  }
}
