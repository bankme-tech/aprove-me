import { Assignor } from '@prisma/client';

export class Payable {
  id: string;
  value: number;
  assignorId: string;
  emissionDate: Date;
  assignor?: Assignor;

  constructor(
    id: string,
    value: number,
    assignorId: string,
    emissionDate: Date,
  ) {
    this.id = id;
    this.value = value;
    this.assignorId = assignorId;
    this.emissionDate = emissionDate;
  }
}
