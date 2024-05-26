/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Assignor } from '../domain/entities/assignor.entity';
import { InMemoryAssignorsRepository } from '../domain/repositories/in-memory/in-memory-assignors.repository';
import { FindAssignorByIdUseCase } from './find-assignor-by-id.use-case';
import { PatchAssignorUseCase } from './patch-assignor.use-case';

describe('Delete assignor use case', () => {
  let entity: Assignor;
  let repository: InMemoryAssignorsRepository;
  let patchAssignorUseCase: PatchAssignorUseCase;
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
    patchAssignorUseCase = new PatchAssignorUseCase(
      repository,
      findAssignorByIdUseCase,
    );
  });

  it('should be able to patch assignor', async () => {
    await repository.create(entity);

    await patchAssignorUseCase.execute({
      id: entity.id,
      patchAssignorDto: { document: 'New document' },
    });

    const patchedEntity = await repository.findById(entity.id);

    /* @ts-ignore */
    expect(patchedEntity?.document).toEqual('New document');
  });
});
