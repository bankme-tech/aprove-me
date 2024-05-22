import { UUID } from 'crypto';

export class Payable {
  public id: UUID;
  public value: number;
  public emissionDate: Date;
  public assignor: UUID;

  constructor(id: UUID, value: number, emissionDate: Date, assignor: UUID) {
    this.id = id;
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignor = assignor;
  }
}
