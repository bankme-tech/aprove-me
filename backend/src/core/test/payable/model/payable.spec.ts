import { Payable } from '@core/payable/model';
import { PayableDataBuilder } from '@core/test/__mocks__/data-builder';

describe('Payable Entity', () => {
  const props = PayableDataBuilder.aPayable().build();

  describe('constructor', () => {
    it('should add notification if value is invalid', () => {
      const props = PayableDataBuilder.aPayable().withValue(null).build();

      const payable = Payable.create(props);

      const expectedMessage = {
        valor: ['valor não pode ser nulo', 'valor deve ser um número float'],
      };

      expect(payable.notifications).toStrictEqual(expectedMessage);
    });

    it('should add notification if assignor invalid', () => {
      const props = PayableDataBuilder.aPayable()
        .withAssignor('invalid-uuid')
        .build();

      const payable = Payable.create(props);

      const expectedMessage = {
        id: ['deve ser do tipo UUID'],
      };

      expect(payable.notifications).toStrictEqual(expectedMessage);
    });

    it('should create a Payable with valid props', () => {
      const payable = Payable.create(props);

      expect(payable.value).toBe(props.value);
      expect(payable.notifications).toEqual({});
      expect(payable.assignor).toBe(props.assignor);
      expect(payable.emissionDate).toBeDefined();
    });
  });
});
