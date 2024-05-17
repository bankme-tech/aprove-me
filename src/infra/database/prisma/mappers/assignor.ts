import { Assignor } from '@/app/entities/assignor';
import { Assignor as RawAssignor } from '@prisma/client';

export class PrismaAssignorMapper {
  static toDomain(raw: RawAssignor) {
    return new Assignor(raw, raw.id);
  }

  static toPrisma(assignor: Assignor) {
    return {
      id: assignor._id,
      name: assignor.props.name,
      email: assignor.props.email,
      phone: assignor.props.phone,
      document: assignor.props.document,
    };
  }
}
