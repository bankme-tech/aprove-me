import { InMemoryAssignorRepository } from '@/database/repositories/in-memory/in-memory-assignor.repository';
import { randomUUID } from 'crypto';
import { InMemoryPayableRepository } from '@/database/repositories/in-memory/in-memory-payable.repository';
import {
  UpdatePayableUseCase,
  UpdatePayableUseCaseError,
} from './update-payable';
import { makePayable } from '@test/factories/payable.factory';

let payableRepository = new InMemoryPayableRepository();
let assignorRepository = new InMemoryAssignorRepository();
let service = new UpdatePayableUseCase(payableRepository, assignorRepository);

describe('UpdatePayableUseCase', () => {
  beforeEach(() => {
    payableRepository = new InMemoryPayableRepository();
    assignorRepository = new InMemoryAssignorRepository();
    service = new UpdatePayableUseCase(payableRepository, assignorRepository);
  });

  it('should be able to update payable', async () => {
    const payable = makePayable();
    payableRepository.create(payable);

    const response = await service.execute({
      id: payable.id,
      emissionDate: '2022-02-22',
      value: 100,
    });

    expect(response.isRight()).toBeTruthy();
    expect(
      response.isRight() &&
        response.value.payable.emissionDate
          .toISOString()
          .startsWith('2022-02-22'),
    ).toBeTruthy();
    expect(response.isRight() && response.value.payable.value).toBe(100);
  });

  it('should be able to update only payable value', async () => {
    const payable = makePayable({ assignorId: 'assignor-id' });
    payableRepository.create(payable);

    const response = await service.execute({
      id: payable.id,
      value: 2500,
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.isRight() && response.value.payable.value).toBe(2500);
    expect(response.isRight() && response.value.payable.emissionDate).not.toBe(
      undefined,
    );
    expect(response.isRight() && response.value.payable.assignorId).toBe(
      'assignor-id',
    );
  });

  it('should not be able to update inexistent payable', async () => {
    const inexistentId = randomUUID();

    const response = await service.execute({
      id: inexistentId,
      value: 4000,
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBe(UpdatePayableUseCaseError.PAYABLE_NOT_FOUND);
  });

  it('should not be able to update payable using invalid id', async () => {
    const response = await service.execute({
      id: 'invalid-id',
      value: 3000,
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBe(UpdatePayableUseCaseError.INVALID_ID_FORMAT);
  });

  it('should not be able to update payable assignor using invalid id', async () => {
    const payableToUpdate = makePayable();

    payableRepository.create(payableToUpdate);

    const response = await service.execute({
      id: payableToUpdate.id,
      assignorId: 'invalid-id',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBe(UpdatePayableUseCaseError.ASSIGNOR_INVALID_ID);
  });

  it('should not be able to update payable assignor using inexistent assignorId', async () => {
    const payableToUpdate = makePayable();
    const inexistentAssignor = randomUUID();

    payableRepository.create(payableToUpdate);

    const response = await service.execute({
      id: payableToUpdate.id,
      assignorId: inexistentAssignor,
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBe(UpdatePayableUseCaseError.ASSIGNOR_NOT_FOUND);
  });

  it('should not be able to update payable using invalid date', async () => {
    const payableToUpdate = makePayable();

    payableRepository.create(payableToUpdate);

    const response = await service.execute({
      id: payableToUpdate.id,
      emissionDate: '2022-13-30',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBe(
      UpdatePayableUseCaseError.INVALID_EMISSION_DATE,
    );
  });

  it('should not be able to update payable using invalid value', async () => {
    const payableToUpdate = makePayable();

    payableRepository.create(payableToUpdate);

    const response = await service.execute({
      id: payableToUpdate.id,
      value: -20,
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBe(UpdatePayableUseCaseError.INVALID_VALUE);
  });
});
