import { Assignor } from '@prisma/client';

export class Payable {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
  assignor?: Assignor;

  constructor(id: string, value: number, emissionDate: Date, assignorId: string) {
    this.id = id;
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }
}
