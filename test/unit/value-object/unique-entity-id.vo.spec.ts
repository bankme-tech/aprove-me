import { UniqueEntityIdVO } from '../../../src/domain/common/value-object'

describe('# Teste de Unidade - UniqueEntityIdVO', () => {
  it.each([
    '123e4567-e89b-12d3-a456-526614174000',
    '123e4567-e89b-12d3-a456-42661417400z',
    '123e4567-e89b-12d3-a456426614174000',
    '123e4567-e89b-12d3-a456-4266141740001',
    '123e4567-e89b-12d3-a456-42661417400'
  ])('deve lançar exceção quando informado UUID "%s" inválido',
    (value) => {
      expect(() => new UniqueEntityIdVO(value)).toThrow(`Value ${value} must be a valid UUID`);
    });
});