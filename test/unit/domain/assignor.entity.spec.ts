import { AssignorEntity } from '../../../src/domain/assignor.entity';
import { CnpjVO, CpfVO, EmailVO, PhoneVO, UniqueEntityIdVO } from '../../../src/domain/common/value-object';

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

    expect(assignorPF).toBeInstanceOf(AssignorEntity);
    expect(assignorPF.id).toBeDefined();
    expect(assignorPF.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(assignorPF.document.equals(expectedCpf)).toBeTruthy();
    expect(assignorPF.email.equals(expectedEmail)).toBeTruthy();
    expect(assignorPF.phone.equals(expectedPhone)).toBeTruthy();
    expect(assignorPF.name).toStrictEqual(expectedName);
    expect(assignorPF.toJSON()).toEqual({
      id: expect.any(String),
      document: expectedCpf.value,
      email: expectedEmail.value,
      phone: expectedPhone.value,
      name: expectedName
    });    
  });

  it('deve criar um cedente com CNPJ quando chamado metodo "create"', () => {
    const expectedCnpj = new CnpjVO('54.501.989/0001-46');
    const expectedEmail = new EmailVO('joe.doe@email.com');
    const expectedPhone = new PhoneVO('(11) 99657-1123');
    const expectedName = 'Joe Doe';

    const assignorPF = AssignorEntity.create({
      document: expectedCnpj.value,
      email: expectedEmail.value,
      phone: expectedPhone.value,
      name: expectedName
    });

    expect(assignorPF).toBeInstanceOf(AssignorEntity);
    expect(assignorPF.id).toBeDefined();
    expect(assignorPF.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(assignorPF.document.equals(expectedCnpj)).toBeTruthy();
    expect(assignorPF.email.equals(expectedEmail)).toBeTruthy();
    expect(assignorPF.phone.equals(expectedPhone)).toBeTruthy();
    expect(assignorPF.name).toStrictEqual(expectedName);
    expect(assignorPF.toJSON()).toEqual({
      id: expect.any(String),
      document: expectedCnpj.value,
      email: expectedEmail.value,
      phone: expectedPhone.value,
      name: expectedName
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
