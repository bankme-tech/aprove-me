import Payable from '../entity/Payable';
import { IPayableCreation } from '../types';

export default class PayableDto extends Payable {
  static toEntity(payable: IPayableCreation): Payable {
    const payableEntity = new Payable();

    payableEntity.value = payable.value;
    payableEntity.emissionDate = payable.emissionDate;

    return payableEntity;
  }
}
