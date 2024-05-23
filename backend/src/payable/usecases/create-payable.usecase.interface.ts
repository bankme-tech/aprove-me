import { CreatePayableInputDTO } from '../dto/create-payable.input.dto';
import { CreatePayableOutputDTO } from '../dto/create-payable.output.dto';

export abstract class ICreatePayableUseCase {
  abstract execute(
    createPayableDTO: CreatePayableInputDTO,
  ): Promise<CreatePayableOutputDTO>;
}
