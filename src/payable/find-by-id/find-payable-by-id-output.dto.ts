export class FindPayableByIdOutputDTO {
  readonly id: string;
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignorId: string;

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
