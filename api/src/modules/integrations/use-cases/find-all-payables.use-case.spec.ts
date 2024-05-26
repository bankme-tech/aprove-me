import { Payable } from '../domain/entities/payable.entity';
import { InMemoryPayablesRepository } from '../domain/repositories/in-memory/in-memory-payables.repository';
import { FindAllPayablesUseCase } from './find-all-payables.use-case';

describe('Delete assignor use case', () => {
  let entity: Payable;
  let repository: InMemoryPayablesRepository;
  let findAllPayablesUseCase: FindAllPayablesUseCase;

  beforeEach(() => {
    entity = new Payable({
      id: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      value: 1,
      emissionDate: new Date(1970, 1, 2),
      assignor: 'de795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
    });
    repository = new InMemoryPayablesRepository();
    findAllPayablesUseCase = new FindAllPayablesUseCase(repository);
  });

  it('should be able to find all', async () => {
    await repository.create(entity);

    const entity2 = new Payable({
      id: 'Ve795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      value: 2,
      emissionDate: new Date(1970, 1, 2),
      assignor: 'de795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
    });

    await repository.create(entity2);

    expect(repository.entities).toHaveLength(2);

    const payables = await findAllPayablesUseCase.execute();

    expect(payables).toHaveLength(2);
  });
});
