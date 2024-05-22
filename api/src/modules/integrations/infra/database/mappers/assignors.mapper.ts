import { Assignor as PrismaAssignor } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { Assignor } from '@/modules/integrations/domain/entities/assignor.entity';

export class AssignorsMapper {
  public static toDomain(assignor: PrismaAssignor): Assignor {
    return new Assignor({
      id: assignor.id,
      document: assignor.document,
      email: assignor.email,
      phone: assignor.phone,
      name: assignor.name,
      createdAt: assignor.createdAt,
      updatedAt: assignor.updatedAt,
    });
  }
  public static toPersist(assignor: Assignor): Prisma.AssignorCreateInput {
    return {
      id: assignor.id,
      document: assignor.document,
      email: assignor.email,
      phone: assignor.phone,
      name: assignor.name,
    };
  }
}
