import type { Payable } from "@prisma/client";

export class PayableDTO {
  readonly id: string;
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignorId: string;

  constructor(payable: Payable) {
    this.id = payable.id;
    this.value = payable.value;
    this.emissionDate = payable.emissionDate;
    this.assignorId = payable.assignorId;
  }
}
