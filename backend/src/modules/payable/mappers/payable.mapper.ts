import { PayablePersistence } from '~/common/types/payable.types';
import { PayableEntity } from '../entities/payable.entity';

export class PayableMapper {
  static toDomain(raw: PayablePersistence): PayableEntity {
    const entity = PayableEntity.create(
      {
        assignorId: raw.assignorId,
        emissionDate: raw.emissionDate,
        value: raw.value,
      },
      raw.id,
    );

    if (entity.isLeft())
      throw new Error(`Can't transform "${raw.id}" payable to domain layer.`);

    return entity.value;
  }

  static toPersistence(raw: PayableEntity): PayablePersistence {
    return {
      id: raw.id,
      assignorId: raw.assignorId,
      emissionDate: raw.emissionDate,
      value: raw.value,
    };
  }
}
