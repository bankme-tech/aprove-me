import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAssignorBodyDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  document: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: number;
}

export class CreateAssignorDataDTO {
  document: string;
  email: string;
  phone: string;
  name: string;
  userId: number;
}
