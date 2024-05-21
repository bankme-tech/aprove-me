export class FindPayableByIdOutputDTO {
  readonly id: string;
  readonly value: number;
  readonly emissionDate: Date;

  constructor(id: string, value: number, emissionDate: Date) {
    this.id = id;
    this.value = value;
    this.emissionDate = emissionDate;
  }
}
