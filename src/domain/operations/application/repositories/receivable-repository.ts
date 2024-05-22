import { Receivable } from "../../enterprise/entities/receivable";

export abstract class ReceivableRepository {
  abstract create(data: Receivable): Promise<void>
  abstract save(data: Receivable): Promise<Receivable>
  abstract delete(recivableId: string): Promise<void>
  abstract findById(id: string): Promise<Receivable | null>
  abstract findByAssignorId(assignorId: string): Promise<Receivable[] | null>
}