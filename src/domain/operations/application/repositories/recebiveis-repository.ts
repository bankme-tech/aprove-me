import { Recivable } from "../../enterprise/entities/recivable";

export abstract class RecivableRepository {
  abstract create(data: Recivable): Promise<void>
  abstract save(data: Recivable): Promise<Recivable>
  abstract delete(recivableId: string): Promise<void>
  abstract findById(id: string): Promise<Recivable | null>
}