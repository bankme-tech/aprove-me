import { UpdatePayableInputDTO } from 'src/payable/dto/update-payable.input.dto';
import { PayableEntity } from 'src/payable/entities/payable.entity';
import { IUpdatePayableUseCase } from 'src/payable/usecases/update-payable.usecase.interface';
import { makePayableEntity } from 'test/mocks/entities/payable.entity.mock';

export class UpdatePayableUseCaseStub implements IUpdatePayableUseCase {
  public data: UpdatePayableInputDTO;
  public response: PayableEntity = makePayableEntity();

  async execute(
    createPayableDTO: UpdatePayableInputDTO,
  ): Promise<PayableEntity> {
    this.data = createPayableDTO;
    return this.response;
  }
}
