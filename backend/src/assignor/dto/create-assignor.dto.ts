import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignorDto {
  @ApiProperty()
  document: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  name: string;

  constructor(assignor: {
    document: string;
    email: string;
    phone: string;
    password: string;
    name: string;
  }) {
    this.document = assignor.document;
    this.email = assignor.email;
    this.phone = assignor.phone;
    this.name = assignor.name;
    this.password = assignor.password;
  }
}
