import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  document: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(140)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\(\d{2}\) 9\d{4}-\d{4}$/, {
    message: 'The phone number should be in the format (XX) 9XXXX-XXXX',
  })
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  name: string;
}
