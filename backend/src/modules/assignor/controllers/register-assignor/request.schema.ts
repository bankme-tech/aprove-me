import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';

export class RegisterAssignorRequestSchema {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'you must provide a name.' })
  @MaxLength(140, { always: false })
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'you must provide a document.' })
  @MaxLength(30)
  document: string;

  @ApiProperty({ required: true, format: 'email' })
  @IsNotEmpty({ message: 'you must provide a email.' })
  @IsEmail()
  @MaxLength(140)
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'you must provide a phone.' })
  @IsPhoneNumber()
  @MaxLength(20)
  phone: string;
}
