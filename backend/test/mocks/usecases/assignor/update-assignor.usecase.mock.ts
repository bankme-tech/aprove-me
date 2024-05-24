import { AssignorEntity } from 'src/assignor/entities/assignor.entity';
import { makeAssignorEntity } from '../../entities/assignor.entity.mock';
import { IUpdateAssignorUseCase } from 'src/assignor/usecases/update-assignor.usecase.interface';
import { UpdateAssignorInputDTO } from 'src/assignor/dto/update-assignor.input.dto';

export class UpdateAssignorUseCaseStub implements IUpdateAssignorUseCase {
  public data: UpdateAssignorInputDTO;
  public response: AssignorEntity = makeAssignorEntity();

  async execute(
    createAssignorDTO: UpdateAssignorInputDTO,
  ): Promise<AssignorEntity> {
    this.data = createAssignorDTO;
    return this.response;
  }
}
