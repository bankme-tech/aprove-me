import { FindPayableInputDTO } from 'src/payable/dto/find-payable.input.dto';
import { PayableEntity } from 'src/payable/entities/payable.entity';
import { IFindPayableUseCase } from 'src/payable/usecases/find-payable.usecase.interface';
import { makePayableEntity } from 'test/mocks/entities/payable.entity.mock';

export class FindPayableUseCaseStub implements IFindPayableUseCase {
  public data: FindPayableInputDTO;
  public response: PayableEntity = makePayableEntity();

  async execute(findPayableDTO: FindPayableInputDTO): Promise<PayableEntity> {
    this.data = findPayableDTO;
    return this.response;
  }
}
