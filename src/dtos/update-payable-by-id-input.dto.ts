export class UpdatePayableByIdInputDTO {
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignorId: string;

  constructor(value: number, emissionDate: Date, assignorId: string) {
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }
}
