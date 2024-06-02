import { Assignor } from '@core/assignor/model';
import { Assignor as AssignorPrisma } from '@prisma/client';
import { PrismAssignorMapper } from './assignor.mapper';

describe('PrismAssignorMapper', () => {
  it('should throw an error when trying to instantiate', () => {
    expect(() => new PrismAssignorMapper()).toThrow(
      'PrismAssignorMapper is a static class and should not be instantiated.',
    );
  });

  it('should convert persistence object to domain object', () => {
    const persistenceObject: AssignorPrisma = {
      id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      document: '123456789',
      createdAt: new Date(2024, 4, 10),
      updatedAt: new Date(2024, 5, 10),
    };

    const domainObject: Assignor =
      PrismAssignorMapper.toDomain(persistenceObject);

    expect(domainObject.id).toBe(persistenceObject.id);
    expect(domainObject.name).toBe(persistenceObject.name);
    expect(domainObject.email).toBe(persistenceObject.email);
    expect(domainObject.phone).toBe(persistenceObject.phone);
    expect(domainObject.document).toBe(persistenceObject.document);
  });
});
