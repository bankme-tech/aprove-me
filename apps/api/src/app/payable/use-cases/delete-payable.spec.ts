import { randomUUID } from 'crypto';
import { InMemoryPayableRepository } from '@/database/repositories/in-memory/in-memory-payable.repository';
import {
  DeletePayableUseCase,
  DeletePayableUseCaseError,
} from './delete-payable';
import { makePayable } from '@test/factories/payable.factory';

let payableRepository = new InMemoryPayableRepository();
let service = new DeletePayableUseCase(payableRepository);

describe('DeletePayableUseCase', () => {
  beforeEach(() => {
    payableRepository = new InMemoryPayableRepository();
    service = new DeletePayableUseCase(payableRepository);
  });

  it('should be able to delete payable by id', async () => {
    const testPayable = makePayable();
    payableRepository.create(testPayable);

    const result = await service.execute({ id: testPayable.id });

    expect(result.isRight()).toBe(true);
    expect(payableRepository.payables.length).toBe(0);
  });

  it('should not be able to delete inexistent payable', async () => {
    const inexistentId = randomUUID();

    const result = await service.execute({ id: inexistentId });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBe(DeletePayableUseCaseError.PAYABLE_NOT_FOUND);
  });

  it('should not be able to delete payable with invalid id format', async () => {
    const result = await service.execute({ id: 'invalid-id' });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBe(DeletePayableUseCaseError.INVALID_ID_FORMAT);
  });
});
