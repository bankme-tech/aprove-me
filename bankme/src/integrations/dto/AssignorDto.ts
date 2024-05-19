import Assignor from '../entity/Assignor';
import { IAssignor } from '../types/IAssignor';

export default class AssignorDto extends Assignor {
  toEntity(): Assignor {
    const payableEntity = new Assignor();

    payableEntity.document = this.document;
    payableEntity.email = this.email;
    payableEntity.name = this.name;
    payableEntity.phone = this.phone;

    return payableEntity;
  }

  static fromEntity(assignor: IAssignor): AssignorDto {
    const assignorDto = new AssignorDto();

    assignorDto.id = assignor.id;
    assignorDto.document = assignor.document;
    assignorDto.email = assignor.email;
    assignorDto.name = assignor.name;
    assignorDto.phone = assignor.phone;

    return assignorDto;
  }

  toJSON() {
    return {
      id: this.id,
      document: this.document,
      email: this.email,
      phone: this.phone,
      name: this.name,
    };
  }
}
