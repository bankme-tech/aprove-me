import { PayableEntity } from '../entities/payable.entity';

export abstract class IFindAllPayablesUseCase {
  abstract execute(): Promise<PayableEntity[]>;
}
