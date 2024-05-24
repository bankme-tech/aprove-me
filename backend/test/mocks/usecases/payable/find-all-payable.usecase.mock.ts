import { PayableEntity } from 'src/payable/entities/payable.entity';
import { IFindAllPayablesUseCase } from 'src/payable/usecases/find-all-payables.usecase.interface';
import { makeManyPayableEntities } from 'test/mocks/entities/payable.entity.mock';

export class FindAllPayablesUseCaseStub implements IFindAllPayablesUseCase {
  public response: PayableEntity[] = makeManyPayableEntities();

  async execute(): Promise<PayableEntity[]> {
    return this.response;
  }
}
