import { UpdatePayableInputDTO } from '../dto/update-payable.input.dto';
import { PayableEntity } from '../entities/payable.entity';

export abstract class IUpdatePayableUseCase {
  abstract execute(
    updatePayableDTO: UpdatePayableInputDTO,
  ): Promise<PayableEntity>;
}
