import { AssignorPersistence } from '~/common/types/assignor.types';
import { AssignorEntity } from '../entities/assignor.entity';

export class AssignorMapper {
  static toDomain(raw: AssignorPersistence): AssignorEntity {
    const entity = AssignorEntity.create(
      {
        name: raw.name,
        document: raw.document,
        email: raw.email,
        phone: raw.phone,
      },
      raw.id,
    );

    if (entity.isLeft())
      throw new Error(`Can't transform "${raw.id}" assignor to domain layer.`);

    return entity.value;
  }

  static toPersistence(raw: AssignorEntity): AssignorPersistence {
    return {
      id: raw.id,
      name: raw.name,
      document: raw.document,
      email: raw.email,
      phone: raw.phone,
    };
  }
}
