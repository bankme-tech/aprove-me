import { AssignorsRepository } from "@/domain/receivables/application/repositories/assignors-repository";
import { Assignor } from "@/domain/receivables/enterprise/entities/assignor";

export class InMemoryAssignorsRepository implements AssignorsRepository {
  public items: Assignor[] = [];

  async create(assignor: Assignor): Promise<void> {
    this.items.push(assignor);
  }

  async update(assignor: Assignor): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === assignor.id);

    this.items[itemIndex] = assignor;
  }

  async delete(assignor: Assignor): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === assignor.id);

    this.items.splice(itemIndex, 1);
  }

  async findById(id: string): Promise<Assignor> {
    const assignor = this.items.find((item) => item.id.toString() === id);

    if (!assignor) return null;

    return assignor;
  }

  async findByDocument(document: string): Promise<Assignor> {
    const assignor = this.items.find((item) => item.document === document);

    if (!assignor) return null;

    return assignor;
  }

  async findByEmail(email: string): Promise<Assignor> {
    const assignor = this.items.find((item) => item.email === email);

    if (!assignor) return null;

    return assignor;
  }
}
