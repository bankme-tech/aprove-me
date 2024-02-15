import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateAssignorDto {
  @IsString()
  @Length(11, 30)
  document: string;

  @IsEmail()
  @Length(0, 140)
  email: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  @Length(0, 140)
  name: string;
}
