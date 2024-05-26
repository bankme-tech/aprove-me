import { Assignor } from '../domain/entities/assignor.entity';
import { InMemoryAssignorsRepository } from '../domain/repositories/in-memory/in-memory-assignors.repository';
import { DeleteAssignorUseCase } from './delete-assignor.use-case';
import { FindAssignorByIdUseCase } from './find-assignor-by-id.use-case';

describe('Delete assignor use case', () => {
  let entity: Assignor;
  let repository: InMemoryAssignorsRepository;
  let deleteAssignorUseCase: DeleteAssignorUseCase;
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
    deleteAssignorUseCase = new DeleteAssignorUseCase(
      repository,
      findAssignorByIdUseCase,
    );
  });

  it('should be able to delete assignor', async () => {
    repository.create(entity);

    expect(repository.entities).toHaveLength(1);

    await deleteAssignorUseCase.execute(entity.id);

    expect(repository.entities).toHaveLength(0);
  });
});
