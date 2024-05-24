import { CreateAssignorInputDTO } from 'src/assignor/dto/create-assignor.input.dto';
import { AssignorEntity } from 'src/assignor/entities/assignor.entity';
import { makeAssignorEntity } from '../../entities/assignor.entity.mock';
import { ICreateAssignorUseCase } from 'src/assignor/usecases/create-assignor.usecase.interface';

export class CreateAssignorUseCaseStub implements ICreateAssignorUseCase {
  public data: CreateAssignorInputDTO;
  public response: AssignorEntity = makeAssignorEntity();

  async execute(
    createAssignorDTO: CreateAssignorInputDTO,
  ): Promise<AssignorEntity> {
    this.data = createAssignorDTO;
    return this.response;
  }
}
