import { Payable } from '../domain/entities/payable.entity';
import { InMemoryPayablesRepository } from '../domain/repositories/in-memory/in-memory-payables.repository';
import { DeletePayableUseCase } from './delete-payable.use-case';
import { FindPayableByIdUseCase } from './find-payable-by-id.use-case';

describe('Delete assignor use case', () => {
  let entity: Payable;
  let repository: InMemoryPayablesRepository;
  let deletePayableUseCase: DeletePayableUseCase;
  let findPayableByIdUseCase: FindPayableByIdUseCase;

  beforeEach(() => {
    entity = new Payable({
      id: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      value: 1,
      emissionDate: new Date(1970, 1, 2),
      assignor: 'de795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
    });
    repository = new InMemoryPayablesRepository();
    findPayableByIdUseCase = new FindPayableByIdUseCase(repository);
    deletePayableUseCase = new DeletePayableUseCase(
      repository,
      findPayableByIdUseCase,
    );
  });

  it('should be able to delete assignor', async () => {
    repository.create(entity);

    expect(repository.entities).toHaveLength(1);

    await deletePayableUseCase.execute(entity.id);

    expect(repository.entities).toHaveLength(0);
  });
});
