import { Assignor } from "../../enterprise/entities/assignor";
import { Payable } from "../../enterprise/entities/payable";

export abstract class PayablesRepository {
  abstract create(payable: Payable, assignor: Assignor): Promise<void>;
}
