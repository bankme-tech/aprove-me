export class Payable {
  constructor(
    public value: number,
    public emissionDate: Date,
    public assignor: string,
    public id?: string,
  ) {}
}
