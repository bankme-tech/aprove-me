import { AssignorsRepository } from "src/domain/operations/application/repositories/assignor-repository"
import { Assignor } from "src/domain/operations/enterprise/entities/assignor"

export class InMemoryAssignorsRepository implements AssignorsRepository {
  public items: Assignor[] = []
  
  async create(data: Assignor) {
    this.items.push(data)
  }

  async save(data: Assignor) {
    const assignorIndex = this.items.findIndex((item) => item.id === data.id)
    this.items[assignorIndex] = data

    return this.items[assignorIndex]
  }
  

  async delete(assignorId: string) {
    const assignorIndex = this.items.findIndex((item) => item.id.toString() === assignorId)
    this.items.splice(assignorIndex, 1)
  }

  async findById(id: string) {
    return this.items.find((item) => item.id.toString() === id)
  }
  
}