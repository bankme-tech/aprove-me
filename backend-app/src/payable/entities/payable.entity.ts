export class Payable {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;

  constructor(
    id: string,
    value: number,
    emissionDate: Date,
    assignorId: string,
  ) {
    this.id = id;
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }
}
