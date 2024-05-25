import { PayablesRepository } from "@/domain/receivables/application/repositories/payables-repository";
import { Payable } from "@/domain/receivables/enterprise/entities/payable";
import { PayableWithAssignor } from "@/domain/receivables/enterprise/entities/value-object/payable-with-assignor";
import { InMemoryAssignorsRepository } from "./in-memory-assignors-repository";
import { PaginationParams } from "@/core/repositories/pagination-params";

export class InMemoryPayablesRepository implements PayablesRepository {
  public items: Payable[] = [];

  constructor(private assignorsRepo: InMemoryAssignorsRepository) {}

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

  async findWithAssignorById(id: string) {
    const payable = this.items.find((payable) => payable.id.toString() === id);

    if (!payable) return null;

    console.log(payable);

    const assignor = this.assignorsRepo.items.find(
      (assignor) => assignor.id.toString() === payable.assignorId.toString()
    );

    console.log(assignor);

    if (!assignor) {
      throw new Error(
        `Assignor with ID "${payable.assignorId.toString()}" does not exists`
      );
    }

    return PayableWithAssignor.create({
      payableId: payable.id,
      emissionDate: payable.emissionDate,
      value: payable.value,
      assignor: {
        id: assignor.id,
        document: assignor.document,
        email: assignor.email,
        name: assignor.name,
        phone: assignor.name,
      },
    });
  }

  async findManyPaginated({ page }: PaginationParams): Promise<Payable[]> {
    const MAX_ITEMS_PER_PAGE = 5;

    const payables = this.items.slice(
      (page - 1) * MAX_ITEMS_PER_PAGE,
      page * MAX_ITEMS_PER_PAGE
    );

    return payables;
  }
}
