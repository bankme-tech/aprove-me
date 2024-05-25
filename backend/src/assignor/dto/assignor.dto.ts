import { ApiProperty } from '@nestjs/swagger';

export class AssignorDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  document: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  name: string;

  constructor(assignor: {
    document: string;
    email: string;
    phone: string;
    name: string;
  }) {
    this.document = assignor.document;
    this.email = assignor.email;
    this.phone = assignor.phone;
    this.name = assignor.name;
  }
}
