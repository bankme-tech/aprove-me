import { Assignor } from '../domain/entities/assignor.entity';
import { InMemoryAssignorsRepository } from '../domain/repositories/in-memory/in-memory-assignors.repository';
import { CreateAssignorUseCase } from './create-assignor.use-case';

describe('Create assignor use case', () => {
  let entity: Assignor;
  let repository: InMemoryAssignorsRepository;
  let createAssignorUseCase: CreateAssignorUseCase;

  beforeEach(() => {
    entity = new Assignor({
      id: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      document: 'document',
      email: 'test@gmail.com',
      phone: '99 9 99999999',
      name: 'test',
    });
    repository = new InMemoryAssignorsRepository();
    createAssignorUseCase = new CreateAssignorUseCase(repository);
  });

  it('should be able to create assignor', () => {
    createAssignorUseCase.execute({
      document: entity.document,
      email: entity.email,
      phone: entity.phone,
      name: entity.name,
    });

    expect(repository.entities).toHaveLength(1);
  });
});
