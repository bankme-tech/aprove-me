import { UUID } from 'crypto';

export class PayableEntity {
  public id?: UUID;
  public value: number;
  public emissionDate: Date;
  public assignorId: UUID;

  constructor(id: UUID, value: number, emissionDate: Date, assignor: UUID) {
    this.id = id;
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignor;
  }
}
