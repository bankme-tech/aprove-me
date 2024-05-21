import { Payable } from "@prisma/client";

export class PayablePresenter {
  static toHTTP(payable: Payable) {
    return {
      id: payable.id.toString(),
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignorId: payable.assignorId,
    };
  }
}
