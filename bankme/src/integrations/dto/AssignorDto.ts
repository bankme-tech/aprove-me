import Assignor from '../entity/Assignor';
import { IPayableCreation } from '../types';

export default class AssignorDto extends Assignor {
  static toEntity(payable: IPayableCreation): Assignor {
    const payableEntity = new Assignor();

    payableEntity.document = payable.assignor.document;
    payableEntity.email = payable.assignor.email;
    payableEntity.name = payable.assignor.name;
    payableEntity.phone = payable.assignor.phone;

    return payableEntity;
  }
}
