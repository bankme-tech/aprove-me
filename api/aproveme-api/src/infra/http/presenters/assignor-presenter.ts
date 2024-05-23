import { Assignor } from "@/domain/receivables/enterprise/entities/assignor";

export class AssignorPresenter {
  static toHTTP(assignor: Assignor) {
    return {
      id: assignor.id.toString(),
      document: assignor.document,
      email: assignor.email,
      name: assignor.name,
      phone: assignor.phone,
      userId: assignor.userId.toString(),
    };
  }
}
