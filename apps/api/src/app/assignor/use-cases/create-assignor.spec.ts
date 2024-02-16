import { InMemoryAssignorRepository } from '@/database/repositories/in-memory/in-memory-assignor.repository';
import {
  CreateAssignorUseCase,
  CreateAssignorUseCaseError,
} from './create-assignor';
import { makeAssignor } from '@test/factories/assignor.factory';
import { cnpj } from 'cpf-cnpj-validator';

let assignorRepository = new InMemoryAssignorRepository();
let service = new CreateAssignorUseCase(assignorRepository);

describe('CreateAssignorUseCase', () => {
  beforeEach(() => {
    assignorRepository = new InMemoryAssignorRepository();
    service = new CreateAssignorUseCase(assignorRepository);
  });

  it('should be able to create new assignor', async () => {
    const assignor = makeAssignor();
    const result = await service.execute(assignor);

    expect(result.isRight()).toBe(true);
    expect(assignorRepository.assignors.length).toBe(1);
  });

  it('should not be able to create new assignor using invalid document', async () => {
    const assignor = makeAssignor({
      document: 'invalid',
    });
    const result = await service.execute(assignor);

    expect(result.isRight()).toBe(false);
    expect(result.value).toBe(CreateAssignorUseCaseError.INVALID_DOCUMENT);
  });

  it('should not be able to create new assignor with repeated document', async () => {
    const existent = makeAssignor({
      document: cnpj.generate(false),
    });

    assignorRepository.create(existent);

    const result = await service.execute(
      makeAssignor({
        document: existent.document,
      }),
    );

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBe(
      CreateAssignorUseCaseError.ASSIGNOR_ALREADY_EXISTS,
    );
  });
});
