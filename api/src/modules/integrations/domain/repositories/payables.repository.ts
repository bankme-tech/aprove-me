import { Payable } from '../entities/payable.entity';

export abstract class PayablesRepository {
  public abstract save(payable: Payable): Promise<Payable>;
  public abstract findById(id: string): Promise<Payable | null>;
}
