import { AssignorName } from "@/domain/receivables/enterprise/entities/value-object/assignor-name";

export class AssignorNamePresenter {
  static toHTTP(assignor: AssignorName) {
    return {
      id: assignor.id.toString(),
      name: assignor.name,
    };
  }
}
