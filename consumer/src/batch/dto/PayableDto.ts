import Payable from '../entity/Payable';

export default class PayableDto {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;

  constructor(
    id?: string,
    value?: number,
    emissionDate?: Date,
    assignorId?: string,
  ) {
    this.id = id;
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }

  static fromEntity(payable: Payable): PayableDto {
    const payableDto = new PayableDto();

    payableDto.id = payable.id;
    payableDto.value = payable.value;
    payableDto.emissionDate = payable.emissionDate;
    payableDto.assignorId = payable.assignorId;

    return payableDto;
  }

  toJSON() {
    return {
      id: this.id,
      value: this.value,
      emissionDate: this.emissionDate,
      assignorId: this.assignorId,
    };
  }
}
