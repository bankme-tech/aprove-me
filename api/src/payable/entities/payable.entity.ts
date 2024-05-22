export class Payable {
  id: string;
  value: number;
  emissionDate: Date;
  assignor: string;

  constructor(payable: Payable) {
    this.id = payable.id;
    this.value = payable.value;
    this.emissionDate = payable.emissionDate;
    this.assignor = payable.assignor;
  }
}
