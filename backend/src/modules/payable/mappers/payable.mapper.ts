import { PayablePersistence } from '~/common/types/payable.types';
import { PayableEntity } from '../entities/payable.entity';
import { AssignorEntity } from '~/modules/assignor/entities/assignor.entity';

export class PayableMapper {
  static toDomain(raw: PayablePersistence): PayableEntity {
    let assignor: AssignorEntity;

    if (raw.assignor) {
      const assignorOrError = AssignorEntity.create(raw.assignor);

      if (assignorOrError.isLeft())
        throw new Error(
          `Can't transform "${raw.assignorId}" assignor to domain layer.`,
        );

      assignor = assignorOrError.value;
    }

    const entity = PayableEntity.create(
      {
        assignorId: raw.assignorId,
        emissionDate: raw.emissionDate,
        value: raw.value,
        assignor,
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
