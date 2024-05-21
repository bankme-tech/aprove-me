import { Assignor } from '@/modules/integrations/domain/entities/assignor.entity';

export class AssignorsViewModel {
  public static toHTTP(assignor: Assignor) {
    return {
      id: assignor.id,
      document: assignor.document,
      email: assignor.email,
      phone: assignor.phone,
      name: assignor.name,
      createdAt: assignor.createdAt,
      updatedAt: assignor.updatedAt,
    };
  }
}
