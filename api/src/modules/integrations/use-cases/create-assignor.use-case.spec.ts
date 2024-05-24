import { Assignor } from '../domain/entities/assignor.entity';
import { InMemoryAssignorsRepository } from '../domain/repositories/in-memory/in-memory-assignors.repository';

describe('Create assignor use case', () => {
  let entity: Assignor;
  let repository: InMemoryAssignorsRepository;

  beforeEach(() => {
    entity = new Assignor({
      id: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      document: 'document',
      email: 'test@gmail.com',
      phone: '99 9 99999999',
      name: 'test',
    });
    repository = new InMemoryAssignorsRepository();
  });

  it('should be able to create assignor', () => {
    repository.create(entity);

    expect(repository.entities).toHaveLength(1);
    expect(repository.entities[0]).toEqual(entity);
  });
});
