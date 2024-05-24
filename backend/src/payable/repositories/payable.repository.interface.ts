import { CreatePayableInputDTO } from '../dto/create-payable.input.dto';
import { FindPayableInputDTO } from '../dto/find-payable.input.dto';
import { PayableEntity } from '../entities/payable.entity';

export abstract class IPayableRepository {
  abstract save(
    createPayableDTO: CreatePayableInputDTO,
  ): Promise<PayableEntity>;
  abstract findAll(): Promise<PayableEntity[]>;
  abstract findOne(findPayableDTO: FindPayableInputDTO): Promise<PayableEntity>;
}
