import { RemovePayableInputDTO } from 'src/payable/dto/remove-payable.input.dto';
import { IRemovePayableUseCase } from 'src/payable/usecases/remove-payable.usecase.interface';

export class RemovePayableUseCaseStub implements IRemovePayableUseCase {
  public data: RemovePayableInputDTO;
  public response: Promise<void>;

  async execute(removePayableDTO: RemovePayableInputDTO): Promise<void> {
    this.data = removePayableDTO;
    return;
  }
}
