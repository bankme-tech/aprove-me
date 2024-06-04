import { PayableWithAssignor } from "@/domain/receivables/enterprise/entities/value-object/payable-with-assignor";

export class PayableWithAssignorPresenter {
  static toHTTP(payable: PayableWithAssignor) {
    return {
      payableId: payable.payableId.toString(),
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignor: {
        id: payable.assignor.id.toString(),
        document: payable.assignor.document,
        email: payable.assignor.email,
        name: payable.assignor.name,
        phone: payable.assignor.phone,
      },
    };
  }
}
