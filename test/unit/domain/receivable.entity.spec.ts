import { faker } from '@faker-js/faker';

import { UniqueEntityIdVO } from '../../../src/domain/common/value-object';
import { ReceivableEntity } from '../../../src/domain/entity';

describe('# Test de Unidade - ReceivableEntity', () => {
  it('deve criar um recebível quando chamado metodo "create"', () => {
    const expectedAssignor = new UniqueEntityIdVO();
    const expectedEmissionDate = faker.date.recent();
    const expectedValue = faker.number.int({ min: 11111, max: 99999 });

    const receivable = ReceivableEntity.create({
      assignorId: expectedAssignor.value,
      emissionDate: expectedEmissionDate,
      value: expectedValue,
    });

    expect(receivable).toBeInstanceOf(ReceivableEntity);
    expect(receivable.id).toBeDefined();
    expect(receivable.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(receivable.assignorId.value).toEqual(expectedAssignor.value);
    expect(receivable.assignorId).toBeInstanceOf(UniqueEntityIdVO);
    expect(receivable.emissionDate).toStrictEqual(expectedEmissionDate);
    expect(receivable.value).toStrictEqual(expectedValue);

    expect(receivable.toJSON()).toEqual({
      id: expect.any(String),
      assignorId: expectedAssignor.value,
      emissionDate: expectedEmissionDate,
      value: expectedValue,
    });
  });

  it('deve carregar um recebível corretamente', () => {
    const expectedId = new UniqueEntityIdVO();
    const expectedAssignor = new UniqueEntityIdVO();
    const expectedEmissionDate = faker.date.recent();
    const expectedValue = faker.number.int({ min: 11111, max: 99999 });

    const receivable = new ReceivableEntity({
      id: expectedId.value,
      assignorId: expectedAssignor.value,
      emissionDate: expectedEmissionDate,
      value: expectedValue,
    });

    expect(receivable).toBeInstanceOf(ReceivableEntity);
    expect(receivable.id).toBeDefined();
    expect(receivable.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(receivable.assignorId.value).toEqual(expectedAssignor.value);
    expect(receivable.assignorId).toBeInstanceOf(UniqueEntityIdVO);
    expect(receivable.emissionDate).toStrictEqual(expectedEmissionDate);
    expect(receivable.value).toStrictEqual(expectedValue);
  });
});
