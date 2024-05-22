import { faker } from '@faker-js/faker';

import {
  ValueObject,
  deepFreeze,
} from '../../../src/domain/common/value-object/value-object';

describe('# Teste de Unidade - ValueObject', () => {
  class TestValueObject extends ValueObject<number> {}

  it('deve inicializar com o valor correto', () => {
    const expectedValue = 10;
    const vo = new TestValueObject(expectedValue);

    expect(vo.value).toStrictEqual(expectedValue);
  });

  it('deve manter objeto quando chamado deepFreeze', () => {
    const obj = {
      name: faker.person.fullName(),
      address: { country: faker.location.country() },
    };
    const frozenObj = deepFreeze(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(Object.isFrozen(frozenObj.address)).toBe(true);

    expect(() => (frozenObj.name = 'invalid_name')).toThrow();
    expect(() => (frozenObj.address.country = 'invalid_country')).toThrow();
  });

  it('deve retornar "true" quando for igual', () => {
    const vo1 = new TestValueObject(10);
    const vo2 = new TestValueObject(10);

    expect(vo1.equals(vo2)).toBeTruthy();
  });

  it('deve retornat "false" quando valores diferentes', () => {
    const vo1 = new TestValueObject(10);
    const vo2 = new TestValueObject(20);

    expect(vo1.equals(vo2)).toBeFalsy();
  });

  it('deve retornat "false" quando comparado com vazio ou indefinido', () => {
    const vo1 = new TestValueObject(10);

    expect(vo1.equals(null as any)).toBeFalsy();
    expect(vo1.equals(undefined as any)).toBeFalsy();
  });

  it('deve return "false" se comparado com um object de tipo diferente', () => {
    class AnotherValueObject extends ValueObject<number> {}

    const vo1 = new TestValueObject(10);
    const vo2 = new AnotherValueObject(10);

    expect(vo1.equals(vo2)).toBe(false);
  });

  it('deve retornar "string" representação do valor', () => {
    const vo1 = new TestValueObject(10);
    expect(vo1.toString()).toStrictEqual('10');

    const vo2 = new TestValueObject({ a: 1, b: 2 } as any);
    expect(vo2.toString()).toBe(JSON.stringify({ a: 1, b: 2 }));
  });

  it('deve lidar com valores sem um método toString normalmente', () => {
    const vo = new TestValueObject(Object.create(null));
    expect(vo.toString()).toStrictEqual('{}');
  });
});
