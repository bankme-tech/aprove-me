import { IRemoveAssignorUseCase } from 'src/assignor/usecases/remove-assignor.usecase.interface';
import { RemoveAssignorInputDTO } from 'src/assignor/dto/remove-assignor.input.dto';

export class RemoveAssignorUseCaseStub implements IRemoveAssignorUseCase {
  public data: RemoveAssignorInputDTO;
  public response: Promise<void>;

  async execute(removeAssignorDTO: RemoveAssignorInputDTO): Promise<void> {
    this.data = removeAssignorDTO;
    return;
  }
}
