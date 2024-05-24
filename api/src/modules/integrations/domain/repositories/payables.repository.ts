import { Payable } from '../entities/payable.entity';

export abstract class PayablesRepository {
  public abstract save(payable: Payable): Promise<Payable>;
  public abstract findById(id: string): Promise<Payable | null>;
  public abstract update(payable: Payable): Promise<Payable>;
  public abstract delete(id: string): Promise<void>;
  public abstract findAll(): Promise<Payable[]>;
}
