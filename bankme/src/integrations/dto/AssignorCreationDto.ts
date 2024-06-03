import { IsEmail, IsNotEmpty } from 'class-validator';
import Assignor from '../entity/Assignor';
import { ApiProperty } from '@nestjs/swagger';

export default class AssignorCreationDto {
  @ApiProperty({
    example: '12345789100',
    required: true,
  })
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    example: 'email@example.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    required: true,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '99 99999-9999',
    required: true,
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
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
