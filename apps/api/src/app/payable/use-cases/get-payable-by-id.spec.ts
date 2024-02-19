import { randomUUID } from 'crypto';
import { InMemoryPayableRepository } from '@/database/repositories/in-memory/in-memory-payable.repository';
import {
  GetPayableByIdUseCase,
  GetPayableByIdUseCaseError,
} from './get-payable-by-id';
import { makePayable } from '@test/factories/payable.factory';

let payableRepository = new InMemoryPayableRepository();
let service = new GetPayableByIdUseCase(payableRepository);

describe('GetPayableByIdUseCase', () => {
  beforeEach(() => {
    payableRepository = new InMemoryPayableRepository();
    service = new GetPayableByIdUseCase(payableRepository);
  });

  it('should be able to return payable using valid id', async () => {
    const testPayable = makePayable();
    payableRepository.create(testPayable);

    const payable = await service.execute({ id: testPayable.id });

    expect(payable.isRight()).toBe(true);
    expect(payable.isRight() && payable.value.payable.id).toBe(testPayable.id);
  });

  it('should not be able to return payable using inexistent id', async () => {
    const inexistentId = randomUUID();
    const payable = await service.execute({ id: inexistentId });

    expect(payable.isLeft()).toBe(true);
    expect(payable.value).toEqual(GetPayableByIdUseCaseError.PAYABLE_NOT_FOUND);
  });

  it('should not be able to return payable using invalid id format', async () => {
    const payable = await service.execute({ id: 'invalid-id' });

    expect(payable.isLeft()).toBe(true);
    expect(payable.value).toEqual(GetPayableByIdUseCaseError.INVALID_ID_FORMAT);
  });
});
