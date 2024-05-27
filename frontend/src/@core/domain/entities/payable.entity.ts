export class Payable {
  public id: string;
  public value: number;
  public emissionDate: Date;
  public assignorId: string;

  constructor(
    id: string,
    value: number,
    emissionDate: Date,
    assignorId: string
  ) {
    this.id = id;
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }
}
