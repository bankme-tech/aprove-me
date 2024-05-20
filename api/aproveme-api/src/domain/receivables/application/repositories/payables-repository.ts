import { Payable } from "../../enterprise/entities/payable";

export abstract class PayablesRepository {
  abstract create(payable: Payable): Promise<void>;
}
