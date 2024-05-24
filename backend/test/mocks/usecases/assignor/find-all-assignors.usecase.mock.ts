import { AssignorEntity } from 'src/assignor/entities/assignor.entity';
import { IFindAllAssignorsUseCase } from 'src/assignor/usecases/find-all-assignors.usecase.interface';
import { makeManyAssignorEntities } from '../../../mocks/entities/assignor.entity.mock';

export class FindAllAssignorsUseCaseStub implements IFindAllAssignorsUseCase {
  public response: AssignorEntity[] = makeManyAssignorEntities();

  async execute(): Promise<AssignorEntity[]> {
    return this.response;
  }
}
