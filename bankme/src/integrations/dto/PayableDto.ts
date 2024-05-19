import Payable from '../entity/Payable';
import { IPayable } from '../types/IPayables';

export default class PayableDto extends Payable {
  toEntity(): Payable {
    const payableEntity = new Payable();

    payableEntity.value = this.value;
    payableEntity.emissionDate = this.emissionDate;
    payableEntity.assignorId = this.assignorId;

    return payableEntity;
  }

  static fromEntity(payable: IPayable): PayableDto {
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
