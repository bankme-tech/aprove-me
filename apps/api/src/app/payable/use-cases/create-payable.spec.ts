import { InMemoryAssignorRepository } from '@/database/repositories/in-memory/in-memory-assignor.repository';
import { InMemoryPayableRepository } from '@/database/repositories/in-memory/in-memory-payable.repository';
import {
  CreatePayableUseCase,
  CreatePayableUseCaseError,
} from './create-payable';
import { makeAssignor } from '@test/factories/assignor.factory';
import { randomUUID } from 'crypto';

let payableRepository = new InMemoryPayableRepository();
let assignorRepository = new InMemoryAssignorRepository();
let service = new CreatePayableUseCase(payableRepository, assignorRepository);

describe('CreatePayable', () => {
  beforeEach(() => {
    payableRepository = new InMemoryPayableRepository();
    assignorRepository = new InMemoryAssignorRepository();
    service = new CreatePayableUseCase(payableRepository, assignorRepository);
  });

  it('should be able to create new payable', async () => {
    const assignor = makeAssignor();
    assignorRepository.create(assignor);

    const createdPayable = await service.execute({
      assignorId: assignor.id,
      emissionDate: '2024-02-16',
      value: 100,
    });

    expect(createdPayable.isRight()).toBe(true);
    expect(payableRepository.payables.length).toBe(1);
  });

  it('should be able to create new payable with valid date', async () => {
    const assignor = makeAssignor();
    assignorRepository.create(assignor);

    const createdPayable = await service.execute({
      assignorId: assignor.id,
      emissionDate: '2023-12-12',
      value: 100,
    });

    expect(createdPayable.isRight()).toBe(true);
    expect(
      createdPayable.isRight() &&
        createdPayable.value.payable.emissionDate.getFullYear(),
    ).toBe(2023);
    expect(
      createdPayable.isRight() &&
        createdPayable.value.payable.emissionDate.getMonth(),
    ).toBe(11);
    expect(
      createdPayable.isRight() &&
        createdPayable.value.payable.emissionDate.getDate(),
    ).toBe(12);
  });

  it('should not be able to create payable using invalid emissiondate format', async () => {
    const assignor = makeAssignor();
    assignorRepository.create(assignor);

    const createdPayable = await service.execute({
      assignorId: assignor.id,
      emissionDate: 'invalid-date',
      value: 100,
    });

    expect(createdPayable.isLeft()).toBe(true);
    expect(createdPayable.value).toBe(
      CreatePayableUseCaseError.INVALID_EMISSION_DATE_FORMAT,
    );
  });

  it('should not be able to create payable using invalid emissiondate month', async () => {
    const assignor = makeAssignor();
    assignorRepository.create(assignor);

    const createdPayable = await service.execute({
      assignorId: assignor.id,
      emissionDate: '2024-13-01',
      value: 100,
    });

    expect(createdPayable.isLeft()).toBe(true);
    expect(createdPayable.value).toBe(
      CreatePayableUseCaseError.INVALID_EMISSION_DATE,
    );
  });

  it('should not be able to create payable with invalid value', async () => {
    const assignor = makeAssignor();
    assignorRepository.create(assignor);

    const createdPayable = await service.execute({
      assignorId: assignor.id,
      emissionDate: '2024-10-01',
      value: -1,
    });

    expect(createdPayable.isLeft()).toBe(true);
    expect(createdPayable.value).toBe(CreatePayableUseCaseError.INVALID_VALUE);
  });

  it('should not be able to create payable with invalid assignorid', async () => {
    const createdPayable = await service.execute({
      assignorId: 'invalid-id',
      emissionDate: '2024-10-01',
      value: 100,
    });

    expect(createdPayable.isLeft()).toBe(true);
    expect(createdPayable.value).toBe(
      CreatePayableUseCaseError.INVALID_ASSIGNOR_ID,
    );
  });

  it('should not be able to create payable with inexistent assignor', async () => {
    const createdPayable = await service.execute({
      assignorId: randomUUID(),
      emissionDate: '2024-10-01',
      value: 100,
    });

    expect(createdPayable.isLeft()).toBe(true);
    expect(createdPayable.value).toBe(
      CreatePayableUseCaseError.ASSIGNOR_NOT_FOUND,
    );
  });
});
