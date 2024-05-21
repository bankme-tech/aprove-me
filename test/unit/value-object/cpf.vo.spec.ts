import { CpfVO } from '../../../src/domain/common/value-object';

describe('# Teste de Unidade - Cpf', () => {
  const invalidCpf = [
    '406.302.170-27',
    '406302170',
    '406302170123456789',
    '406302170123456789',
  ];

  it.each(invalidCpf)(
    'Deve lançar exceção quando informado CPF inválido - "%s"',
    (value) => {
      expect(() => new CpfVO(value)).toThrow(new Error('Invalid Field: cpf.'));
    }
  );

  it.each(['111.111.111-11', '222.222.222-22'])(
    'Deve lançar exceção quando CPF ter números repetidos - "%s"',
    (value) => {
      expect(() => new CpfVO(value)).toThrow(new Error('Invalid Field: cpf.'));
    }
  );

  it('deve retornar uma instância de CPF', () => {
    const value = '389.967.700-51'
    const cpf = new CpfVO(value);

    expect(cpf.value).toStrictEqual(value.replace(/\D/g, ''));
    expect(cpf).toBeInstanceOf(CpfVO);
    expect(cpf.toString()).toStrictEqual(value);
  });
});
