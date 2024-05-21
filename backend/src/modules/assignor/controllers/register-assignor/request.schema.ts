import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';

export class RegisterAssignorRequestSchema {
  @IsNotEmpty({ message: 'you must provide a name.' })
  @MaxLength(140, { always: false })
  name: string;

  @IsNotEmpty({ message: 'you must provide a document.' })
  @MaxLength(30)
  document: string;

  @IsNotEmpty({ message: 'you must provide a email.' })
  @IsEmail()
  @MaxLength(140)
  email: string;

  @IsNotEmpty({ message: 'you must provide a phone.' })
  @IsPhoneNumber()
  @MaxLength(20)
  phone: string;
}
