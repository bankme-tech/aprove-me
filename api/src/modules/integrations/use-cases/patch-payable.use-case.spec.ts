/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Payable } from '../domain/entities/payable.entity';
import { InMemoryPayablesRepository } from '../domain/repositories/in-memory/in-memory-payables.repository';
import { FindPayableByIdUseCase } from './find-payable-by-id.use-case';
import { PatchPayableUseCase } from './patch-payable.use-case';

describe('Delete assignor use case', () => {
  let entity: Payable;
  let repository: InMemoryPayablesRepository;
  let patchPayableUseCase: PatchPayableUseCase;
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
    patchPayableUseCase = new PatchPayableUseCase(
      repository,
      findPayableByIdUseCase,
    );
  });

  it('should be able to patch assignor', async () => {
    await repository.create(entity);

    await patchPayableUseCase.execute({
      id: entity.id,
      patchPayableDto: { value: 999 },
    });

    const patchedEntity = await repository.findById(entity.id);

    /* @ts-ignore */
    expect(patchedEntity?.value).toEqual(999);
  });
});
