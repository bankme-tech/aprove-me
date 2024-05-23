import { CreatePayableInputDTO } from '../dto/create-payable.input.dto';
import { PayableEntity } from '../entities/payable.entity';

export abstract class IPayableRepository {
  abstract save(
    createPayableDTO: CreatePayableInputDTO,
  ): Promise<PayableEntity>;
}
