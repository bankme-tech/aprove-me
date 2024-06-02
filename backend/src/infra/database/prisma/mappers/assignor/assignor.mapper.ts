import { Assignor } from '@core/assignor/model';

import { Assignor as AssignorPrisma } from '@prisma/client';

export class PrismAssignorMapper {
  constructor() {
    throw new Error(
      'PrismAssignorMapper is a static class and should not be instantiated.',
    );
  }

  public static toDomain(persistence: AssignorPrisma): Assignor {
    return Assignor.create({
      id: persistence.id,
      name: persistence.name,
      email: persistence.email,
      phone: persistence.phone,
      document: persistence.document,
    });
  }
}
