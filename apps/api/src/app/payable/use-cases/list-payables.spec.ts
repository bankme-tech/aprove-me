import { InMemoryPayableRepository } from '@/database/repositories/in-memory/in-memory-payable.repository';
import { ListPayablesUseCase } from './list-payables';
import { makePayable } from '@test/factories/payable.factory';

let payableRepository = new InMemoryPayableRepository();
let service = new ListPayablesUseCase(payableRepository);

describe('ListPayablesUseCase', () => {
  beforeEach(() => {
    payableRepository = new InMemoryPayableRepository();
    service = new ListPayablesUseCase(payableRepository);
  });

  it('should be able to list all payables', async () => {
    payableRepository.create(makePayable());
    payableRepository.create(makePayable());
    payableRepository.create(makePayable());
    payableRepository.create(makePayable());

    const payables = await service.execute();

    expect(payables.isRight()).toBeTruthy();
    expect(payables.isRight() && payables.value.payables.length).toBe(4);
  });
});
