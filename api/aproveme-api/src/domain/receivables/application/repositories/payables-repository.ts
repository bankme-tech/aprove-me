import { Payable } from "../../enterprise/entities/payable";

export abstract class PayablesRepository {
  abstract create(payable: Payable): Promise<void>;
  abstract update(payable: Payable): Promise<void>;
  abstract delete(payable: Payable): Promise<void>;
  abstract findByid(id: string): Promise<Payable | null>;
}
