import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateAssignorDTO {
  @Length(0, 140)
  @IsString()
  name: string;

  @IsPhoneNumber('BR')
  phone: string;

  @Length(0, 140)
  @IsEmail()
  email: string;

  @IsString()
  @Length(11, 30)
  document: string;
}
