import { InMemoryAssignorRepository } from '@/database/repositories/in-memory/in-memory-assignor.repository';
import {
  DeleteAssignorUseCase,
  DeleteAssignorUseCaseError,
} from './delete-assignor';
import { makeAssignor } from '@test/factories/assignor.factory';
import { randomUUID } from 'crypto';

let assignorRepository = new InMemoryAssignorRepository();
let service = new DeleteAssignorUseCase(assignorRepository);

describe('DeleteAssignorUseCase', () => {
  beforeEach(() => {
    assignorRepository = new InMemoryAssignorRepository();
    service = new DeleteAssignorUseCase(assignorRepository);
  });

  it('should be able to delete assignor by id', async () => {
    const testAssignor = makeAssignor();
    assignorRepository.create(testAssignor);

    const result = await service.execute({ id: testAssignor.id });

    expect(result.isRight()).toBe(true);
    expect(assignorRepository.assignors.length).toBe(0);
  });

  it('should not be able to delete inexistent assignor', async () => {
    const inexistentId = randomUUID();

    const result = await service.execute({ id: inexistentId });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBe(DeleteAssignorUseCaseError.ASSIGNOR_NOT_FOUND);
  });

  it('should not be able to delete assignor with invalid id format', async () => {
    const result = await service.execute({ id: 'invalid-id' });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBe(DeleteAssignorUseCaseError.INVALID_ID_FORMAT);
  });
});
