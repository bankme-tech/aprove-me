import { Assignor, IAssignor } from '@bankme/domain';

import { Assignor as PrismaAssignor } from '@prisma/client';

export class AssignorMapper {
  static toPrisma(data: IAssignor): PrismaAssignor {
    return {
      id: data.id,
      document: data.document,
      email: data.email,
      name: data.name,
      phone: data.phone,
    };
  }

  static toDomain(data: PrismaAssignor): Assignor {
    return Assignor.fromData({
      id: data.id,
      document: data.document,
      email: data.email,
      name: data.name,
      phone: data.phone,
    });
  }
}
