import { Payable } from '@core/payable/model';
import { Payable as PayablePrisma } from '@prisma/client';
import { PrismPayableMapper } from './payable.mapper';

describe('PrismPayableMapper', () => {
  it('should throw an error when trying to instantiate', () => {
    expect(() => new PrismPayableMapper()).toThrow(
      'PrismPayableMapper is a static class and should not be instantiated.',
    );
  });

  it('should convert persistence object to domain object', () => {
    const persistenceObject: PayablePrisma = {
      id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
      value: 100.5,
      assignor: '71b1c7d4-0f3a-4386-b0ef-32202f36b15a',
      emissionDate: new Date(2024, 4, 10),
      createdAt: new Date(2024, 4, 10),
      updatedAt: new Date(2024, 5, 10),
    };

    const domainObject: Payable =
      PrismPayableMapper.toDomain(persistenceObject);

    expect(domainObject.id).toBe(persistenceObject.id);
    expect(domainObject.value).toBe(persistenceObject.value);
    expect(domainObject.assignor).toBe(persistenceObject.assignor);
    expect(domainObject.emissionDate).toBe(persistenceObject.emissionDate);
  });
});
