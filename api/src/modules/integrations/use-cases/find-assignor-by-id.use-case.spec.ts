import { Assignor } from '../domain/entities/assignor.entity';
import { InMemoryAssignorsRepository } from '../domain/repositories/in-memory/in-memory-assignors.repository';
import { FindAssignorByIdUseCase } from './find-assignor-by-id.use-case';

describe('Find assignor by id use case', () => {
  let entity: Assignor;
  let repository: InMemoryAssignorsRepository;
  let findAssignorByIdUseCase: FindAssignorByIdUseCase;

  beforeEach(() => {
    entity = new Assignor({
      id: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      document: 'document',
      email: 'test@gmail.com',
      phone: '99 9 99999999',
      name: 'test',
    });
    repository = new InMemoryAssignorsRepository();
    findAssignorByIdUseCase = new FindAssignorByIdUseCase(repository);
  });

  it('should be able to find assignor by id', async () => {
    await repository.create(entity);

    const assignor = await findAssignorByIdUseCase.execute(entity.id);

    expect(assignor.id).toBe(entity.id);
  });
});
