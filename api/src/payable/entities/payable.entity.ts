import { Assignor } from '@prisma/client';

export class Payable {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
  assignor: Assignor;

  constructor(payable: Partial<Payable>) {
    this.id = payable?.id;
    this.value = payable?.value;
    this.emissionDate = payable?.emissionDate;
    this.assignorId = payable?.assignorId;
  }
}
