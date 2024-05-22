import { faker } from '@faker-js/faker';

import { AssignorEntity, ReceivableEntity } from '../../../src/domain/entity';
import { CnpjVO, CpfVO, EmailVO, PhoneVO, UniqueEntityIdVO } from '../../../src/domain/common/value-object';

const makeReceivable = (assignorId: UniqueEntityIdVO) => {
  return ReceivableEntity.create({
    assignor: assignorId.value,
    emissionDate: faker.date.recent(),
    value: faker.number.int({ min: 11111, max: 99999 })
  });
}

describe('Teste de Unidade - AssignorEntity', () => {
  it('deve criar um cedente com CPF quando chamado metodo "create"', () => {
    const expectedCpf = new CpfVO('389.967.700-51');
    const expectedEmail = new EmailVO('joe.doe@email.com');
    const expectedPhone = new PhoneVO('(11) 99657-1123');
    const expectedName = 'Joe Doe';

    const assignorPF = AssignorEntity.create({
      document: expectedCpf.value,
      email: expectedEmail.value,
      phone: expectedPhone.value,
      name: expectedName
    });

    const expectedReceivable = makeReceivable(assignorPF.id);
    assignorPF.addReceivable(expectedReceivable.toJSON());

    expect(assignorPF).toBeInstanceOf(AssignorEntity);
    expect(assignorPF.id).toBeDefined();
    expect(assignorPF.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(assignorPF.document.equals(expectedCpf)).toBeTruthy();
    expect(assignorPF.email.equals(expectedEmail)).toBeTruthy();
    expect(assignorPF.phone.equals(expectedPhone)).toBeTruthy();
    expect(assignorPF.name).toStrictEqual(expectedName);
    expect(assignorPF.receivables).toEqual([expectedReceivable]);
    expect(assignorPF.toJSON()).toEqual({
      id: expect.any(String),
      document: expectedCpf.value,
      email: expectedEmail.value,
      phone: expectedPhone.value,
      name: expectedName,
      receivables: [expectedReceivable.toJSON()]
    });    
  });

  it('deve criar um cedente com CNPJ quando chamado metodo "create"', () => {
    const expectedCnpj = new CnpjVO('54.501.989/0001-46');
    const expectedEmail = new EmailVO('joe.doe@email.com');
    const expectedPhone = new PhoneVO('(11) 99657-1123');
    const expectedName = 'Joe Doe';

    const assignorPJ = AssignorEntity.create({
      document: expectedCnpj.value,
      email: expectedEmail.value,
      phone: expectedPhone.value,
      name: expectedName
    });

    expect(assignorPJ).toBeInstanceOf(AssignorEntity);
    expect(assignorPJ.id).toBeDefined();
    expect(assignorPJ.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(assignorPJ.document.equals(expectedCnpj)).toBeTruthy();
    expect(assignorPJ.email.equals(expectedEmail)).toBeTruthy();
    expect(assignorPJ.phone.equals(expectedPhone)).toBeTruthy();
    expect(assignorPJ.name).toStrictEqual(expectedName);
    expect(assignorPJ.receivables).toEqual([]);
    expect(assignorPJ.toJSON()).toEqual({
      id: expect.any(String),
      document: expectedCnpj.value,
      email: expectedEmail.value,
      phone: expectedPhone.value,
      name: expectedName,
      receivables: []
    });    
  });

  it('deve carregar cedente corretamente', () => {
    const expectedId = new UniqueEntityIdVO();
    const expectedCnpj = new CnpjVO('54.501.989/0001-46');
    const expectedEmail = new EmailVO('joe.doe@email.com');
    const expectedPhone = new PhoneVO('(11) 99657-1123');
    const expectedName = 'Joe Doe';

    const assignorPF = new AssignorEntity({
      id: expectedId.value,
      document: expectedCnpj.value,
      email: expectedEmail.value,
      phone: expectedPhone.value,
      name: expectedName
    });

    expect(assignorPF).toBeInstanceOf(AssignorEntity);
    expect(assignorPF.id.equals(expectedId)).toBeTruthy();
    expect(assignorPF.document.equals(expectedCnpj)).toBeTruthy();
    expect(assignorPF.email.equals(expectedEmail)).toBeTruthy();
    expect(assignorPF.phone.equals(expectedPhone)).toBeTruthy();
    expect(assignorPF.name).toStrictEqual(expectedName);    
  });

  it('deve lançar exceção quando informado CPF ou CNPJ invalido', () => {
    const expectedCnpjOrCpfInvalid = '20.651.977-1';
    const expectedEmail = new EmailVO('joe.doe@email.com');
    const expectedPhone = new PhoneVO('(11) 99657-1123');
    const expectedName = 'Joe Doe';

    expect(() => AssignorEntity.create({
      document: expectedCnpjOrCpfInvalid,
      email: expectedEmail.value,
      phone: expectedPhone.value,
      name: expectedName
    })).toThrow('Invalid Field: document.');
  });
});
