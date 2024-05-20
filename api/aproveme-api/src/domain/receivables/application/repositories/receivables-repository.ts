import { Assignor } from "../../enterprise/entities/assignor";
import { Receivable } from "../../enterprise/entities/receivable";

export abstract class ReceivablesRepository {
  abstract create(receivable: Receivable, assignor: Assignor): Promise<void>;
}
