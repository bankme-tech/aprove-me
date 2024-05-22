import { RecivableRepository } from "src/domain/operations/application/repositories/recebiveis-repository";
import { Recivable } from "src/domain/operations/enterprise/entities/recivable";

export class InMemoryRecivableRepository extends RecivableRepository {
  public items: Recivable[] = []

  async create(data: Recivable) {
    this.items.push(data)
  }
  
  async save(data: Recivable) {
    const recivableIndex = this.items.findIndex((item) => item.id.toString() == data.id.toString())
    this.items[recivableIndex] = data

    return this.items[recivableIndex]
  }

  async delete(recivableId: string) {
    const recivableIndex = this.items.findIndex((item) => item.id.toString() == recivableId)
    this.items.splice(recivableIndex, 1)
  }

  async findById(id: string): Promise<Recivable> {
    return this.items.find((item) => item.id.toString() === id)
  }
  
}