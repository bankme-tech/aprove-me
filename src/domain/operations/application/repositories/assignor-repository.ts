import { Assignor } from "../../enterprise/entities/assignor";

export abstract class AssignorsRepository {
  abstract create(data: Assignor): Promise<void>
  abstract save(data: Assignor): Promise<Assignor>
  abstract delete(assignorId: string): Promise<void>
  abstract findById(id: string): Promise<Assignor | null>
}