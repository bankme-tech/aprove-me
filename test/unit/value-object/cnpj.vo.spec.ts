import { CnpjVO } from '../../../src/domain/common/value-object';

describe('# Test de Unidade - Cnpj', () => {
  const invalidCpf = [
    '12.345.678/9012-34',
    '12345678901234',
    '12.345.678/9012-3',
    '2.345.678/9012-345',
    '12.345.678/9012-3X'
  ];

  it.each(invalidCpf)(
    'Deve lançar exceção quando informado CNPJ inválido - "%s"',
    (value) => {
      expect(() => new CnpjVO(value)).toThrow(new Error('Invalid Field: cnpj.'));
    }
  );

  it.each(['00.000.000/0000-00', '44.444.444/4444-44'])(
    'Deve lançar exceção quando CNPJ ter números repetidos - "%s"',
    (value) => {
      expect(() => new CnpjVO(value)).toThrow(new Error('Invalid Field: cnpj.'));
    }
  );

  it('deve retornar uma instância de CNPJ', () => {
    const value = '54.501.989/0001-46'
    const cnpj = new CnpjVO(value);

    expect(cnpj.value).toStrictEqual(value.replace(/\D/g, ''));
    expect(cnpj).toBeInstanceOf(CnpjVO);
    expect(cnpj.toString()).toStrictEqual(value);
  });
});
