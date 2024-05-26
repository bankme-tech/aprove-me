import { Payable } from '../domain/entities/payable.entity';
import { InMemoryPayablesRepository } from '../domain/repositories/in-memory/in-memory-payables.repository';
import { FindPayableByIdUseCase } from './find-payable-by-id.use-case';

describe('Find assignor by id use case', () => {
  let entity: Payable;
  let repository: InMemoryPayablesRepository;
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
  });

  it('should be able to find payable by id', async () => {
    await repository.create(entity);

    const payable = await findPayableByIdUseCase.execute(entity.id);

    expect(payable.id).toBe(entity.id);
  });
});
