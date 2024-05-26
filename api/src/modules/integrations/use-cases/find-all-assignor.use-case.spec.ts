import { Assignor } from '../domain/entities/assignor.entity';
import { InMemoryAssignorsRepository } from '../domain/repositories/in-memory/in-memory-assignors.repository';
import { FindAllAssignorsUseCase } from './find-all-assignors.use-case';

describe('Delete assignor use case', () => {
  let entity: Assignor;
  let repository: InMemoryAssignorsRepository;
  let findAllAssignorsUseCase: FindAllAssignorsUseCase;

  beforeEach(() => {
    entity = new Assignor({
      id: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      document: 'document',
      email: 'test@gmail.com',
      phone: '99 9 99999999',
      name: 'test',
    });
    repository = new InMemoryAssignorsRepository();
    findAllAssignorsUseCase = new FindAllAssignorsUseCase(repository);
  });

  it('should be able to find all', async () => {
    await repository.create(entity);

    const entity2 = new Assignor({
      id: 'Ve795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      document: 'document',
      email: 'test2@gmail.com',
      phone: '99 9 99999999',
      name: 'test',
    });

    await repository.create(entity2);

    expect(repository.entities).toHaveLength(2);

    const assignors = await findAllAssignorsUseCase.execute();

    expect(assignors).toHaveLength(2);
  });
});
