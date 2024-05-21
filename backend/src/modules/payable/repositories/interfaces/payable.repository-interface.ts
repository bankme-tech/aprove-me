import { PayableEntity } from '../../entities/payable.entity';

export abstract class IPayableRepository {
  abstract create(payable: PayableEntity): Promise<void>;
  abstract findById(id: string): Promise<PayableEntity | null>;
  abstract findAll(): Promise<PayableEntity[]>;
  abstract update(payable: PayableEntity): Promise<void>;
}
