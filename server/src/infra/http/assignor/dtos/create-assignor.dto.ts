import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateAssignorDto {
  @IsString()
  @MaxLength(14)
  @ApiProperty()
  document: string;

  @IsEmail()
  @MaxLength(140)
  @ApiProperty()
  email: string;

  @IsString()
  @MaxLength(20)
  @ApiProperty()
  phone: string;

  @IsString()
  @MaxLength(140)
  @ApiProperty()
  name: string;
}
