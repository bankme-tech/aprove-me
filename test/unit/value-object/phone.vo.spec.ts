import { PhoneVO } from "../../../src/domain/common/value-object";

describe('# Test de Unidade - PhoneNumber', () => {
  const invalidValues = [
    ' ',
    '',
    '11',
    '5137839532',
    '(11) 82247878',
    '5137839532123465798',
    'invalid_phonenumber',
  ];

  it.each(invalidValues)(
    'Deve lançar exceção quando telefone for inválido "%s"',
    (value) => {
      expect(() => new PhoneVO(value as any)).toThrow(
        'Invalid Field: phone.'
      );
    }
  );

  it('Deve retornar uma instância de "Phone" quando validações forem aceitas', () => {
    const validPhone = '51937839532';
    const phone = new PhoneVO(validPhone);

    expect(phone.value).toStrictEqual(validPhone);
    expect(phone.toString()).toStrictEqual('(51) 93783-9532');
  });
});
