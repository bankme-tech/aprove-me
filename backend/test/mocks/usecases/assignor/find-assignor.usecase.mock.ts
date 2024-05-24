import { AssignorEntity } from 'src/assignor/entities/assignor.entity';
import { makeAssignorEntity } from '../../entities/assignor.entity.mock';
import { IFindAssignorUseCase } from 'src/assignor/usecases/find-assignor.usecase.interface';
import { FindAssignorInputDTO } from 'src/assignor/dto/find-assignor.input.dto';

export class FindAssignorUseCaseStub implements IFindAssignorUseCase {
  public data: FindAssignorInputDTO;
  public response: AssignorEntity = makeAssignorEntity();

  async execute(
    findAssignorDTO: FindAssignorInputDTO,
  ): Promise<AssignorEntity> {
    this.data = findAssignorDTO;
    return this.response;
  }
}
