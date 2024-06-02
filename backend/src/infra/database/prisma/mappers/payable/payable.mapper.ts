import { Payable } from '@core/payable/model';

import { Payable as PayablePrisma } from '@prisma/client';

export class PrismPayableMapper {
  constructor() {
    throw new Error(
      'PrismPayableMapper is a static class and should not be instantiated.',
    );
  }

  public static toDomain(persistence: PayablePrisma): Payable {
    return Payable.create({
      id: persistence.id,
      value: persistence.value,
      assignor: persistence.assignor,
      emissionDate: persistence.emissionDate,
    });
  }
}
