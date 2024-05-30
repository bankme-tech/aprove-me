import { IsEmail, IsNotEmpty } from 'class-validator';
import Assignor from '../entity/Assignor';

export default class AssignorCreationDto {
  @IsNotEmpty()
  document: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  name: string;

  constructor(
    document?: string,
    email?: string,
    phone?: string,
    name?: string,
  ) {
    this.document = document;
    this.email = email;
    this.phone = phone;
    this.name = name;
  }

  public toEntity(): Assignor {
    const payableEntity = new Assignor();

    payableEntity.document = this.document;
    payableEntity.email = this.email;
    payableEntity.name = this.name;
    payableEntity.phone = this.phone;

    return payableEntity;
  }

  static fromEntity(assignor: Assignor): AssignorCreationDto {
    const assignorDto = new AssignorCreationDto();

    assignorDto.document = assignor.document;
    assignorDto.email = assignor.email;
    assignorDto.name = assignor.name;
    assignorDto.phone = assignor.phone;

    return assignorDto;
  }

  public toJSON() {
    return {
      document: this.document,
      email: this.email,
      phone: this.phone,
      name: this.name,
    };
  }
}
