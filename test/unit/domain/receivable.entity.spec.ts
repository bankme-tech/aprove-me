import { faker } from '@faker-js/faker';

import { UniqueEntityIdVO } from '../../../src/domain/common/value-object';
import { ReceivableEntity } from '../../../src/domain/receivable.entity';

describe('# Test de Unidade - ReceivableEntity', () => {
  it('deve criar um recibivel quando chamado metodo "create"', () => {
    const expectedAssignor = new UniqueEntityIdVO();
    const expectedEmissionDate = faker.date.recent();
    const expectedValue = faker.number.int({ min: 11111, max: 99999 });

    const receivable = ReceivableEntity.create({
      assignor: expectedAssignor.value,
      emissionDate: expectedEmissionDate,
      value: expectedValue
    });

    expect(receivable).toBeInstanceOf(ReceivableEntity);
    expect(receivable.id).toBeDefined();
    expect(receivable.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(receivable.assignor.value).toEqual(expectedAssignor.value);
    expect(receivable.assignor).toBeInstanceOf(UniqueEntityIdVO);
    expect(receivable.emissionDate).toStrictEqual(expectedEmissionDate);
    expect(receivable.value).toStrictEqual(expectedValue);

    expect(receivable.toJSON()).toEqual({
      id: expect.any(String),
      assignor: expectedAssignor.value,
      emissionDate: expectedEmissionDate,
      value: expectedValue
    })
  });

  it('deve carregar um recebivel corretamente', () => {
    const expectedId = new UniqueEntityIdVO();
    const expectedAssignor = new UniqueEntityIdVO();
    const expectedEmissionDate = faker.date.recent();
    const expectedValue = faker.number.int({ min: 11111, max: 99999 });

    const receivable = new ReceivableEntity({
      id: expectedId.value,
      assignor: expectedAssignor.value,
      emissionDate: expectedEmissionDate,
      value: expectedValue
    });

    expect(receivable).toBeInstanceOf(ReceivableEntity);
    expect(receivable.id).toBeDefined();
    expect(receivable.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(receivable.assignor.value).toEqual(expectedAssignor.value);
    expect(receivable.assignor).toBeInstanceOf(UniqueEntityIdVO);
    expect(receivable.emissionDate).toStrictEqual(expectedEmissionDate);
    expect(receivable.value).toStrictEqual(expectedValue);    
  });
});
