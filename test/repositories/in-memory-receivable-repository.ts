import { ReceivableRepository } from "src/domain/operations/application/repositories/receivable-repository"
import { Receivable } from "src/domain/operations/enterprise/entities/receivable"

export class InMemoryReceivableRepository extends ReceivableRepository {
  public items: Receivable[] = []

  async create(data: Receivable) {
    this.items.push(data)
  }
  
  async save(data: Receivable) {
    const receivableIndex = this.items.findIndex((item) => item.id.toString() == data.id.toString())
    this.items[receivableIndex] = data

    return this.items[receivableIndex]
  }

  async delete(receivableId: string) {
    const receivableIndex = this.items.findIndex((item) => item.id.toString() == receivableId)
    this.items.splice(receivableIndex, 1)
  }

  async findById(id: string): Promise<Receivable> {
    return this.items.find((item) => item.id.toString() === id)
  }
  
}