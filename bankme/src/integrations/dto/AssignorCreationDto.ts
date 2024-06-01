import { IsEmail, IsNotEmpty } from 'class-validator';
import Assignor from '../entity/Assignor';

export default class AssignorCreationDto {
  @IsNotEmpty()
  document: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  name: string;

  constructor(
    document?: string,
    email?: string,
    password?: string,
    phone?: string,
    name?: string,
  ) {
    this.document = document;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.name = name;
  }

  public toEntity(): Assignor {
    const payableEntity = new Assignor();

    payableEntity.document = this.document;
    payableEntity.email = this.email;
    payableEntity.password = this.password;
    payableEntity.name = this.name;
    payableEntity.phone = this.phone;

    return payableEntity;
  }
}
