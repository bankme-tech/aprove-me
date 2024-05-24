import { FindPayableInputDTO } from '../dto/find-payable.input.dto';
import { PayableEntity } from '../entities/payable.entity';

export abstract class IFindPayableUseCase {
  abstract execute(findPayableDTO: FindPayableInputDTO): Promise<PayableEntity>;
}
