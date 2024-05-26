import { Assignor } from '../domain/entities/assignor.entity';
import { Payable } from '../domain/entities/payable.entity';
import { InMemoryAssignorsRepository } from '../domain/repositories/in-memory/in-memory-assignors.repository';
import { InMemoryPayablesRepository } from '../domain/repositories/in-memory/in-memory-payables.repository';
import { CreatePayableUseCase } from './create-payable.use-case';
import { FindAssignorByIdUseCase } from './find-assignor-by-id.use-case';

describe('Create assignor use case', () => {
  let entity: Payable;
  let repository: InMemoryPayablesRepository;
  let assignorsRepository: InMemoryAssignorsRepository;
  let createPayableUseCase: CreatePayableUseCase;
  let findAssignorByIdUseCase: FindAssignorByIdUseCase;

  beforeEach(() => {
    entity = new Payable({
      id: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      value: 1,
      emissionDate: new Date(1970, 1, 2),
      assignor: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
    });
    repository = new InMemoryPayablesRepository();
    assignorsRepository = new InMemoryAssignorsRepository();
    findAssignorByIdUseCase = new FindAssignorByIdUseCase(assignorsRepository);
    createPayableUseCase = new CreatePayableUseCase(
      repository,
      findAssignorByIdUseCase,
    );
  });

  it('should be able to create assignor', async () => {
    assignorsRepository.create(
      new Assignor({
        id: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
        document: 'document',
        email: 'test@gmail.com',
        name: 'test',
        phone: '999999',
      }),
    );

    await createPayableUseCase.execute({
      value: entity.value,
      emissionDate: entity.emissionDate,
      assignor: entity.assignor,
    });

    expect(repository.entities).toHaveLength(1);
  });
});
