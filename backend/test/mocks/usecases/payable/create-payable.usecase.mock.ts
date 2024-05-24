import { CreatePayableInputDTO } from 'src/payable/dto/create-payable.input.dto';
import { PayableEntity } from 'src/payable/entities/payable.entity';
import { ICreatePayableUseCase } from 'src/payable/usecases/create-payable.usecase.interface';
import { makePayableEntity } from 'test/mocks/entities/payable.entity.mock';

export class CreatePayableUseCaseStub implements ICreatePayableUseCase {
  public data: CreatePayableInputDTO;
  public response: PayableEntity = makePayableEntity();

  async execute(
    createPayableDTO: CreatePayableInputDTO,
  ): Promise<PayableEntity> {
    this.data = createPayableDTO;
    return this.response;
  }
}
