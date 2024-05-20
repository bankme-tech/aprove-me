import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAssignorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  document: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  // @IsPhoneNumber('BR')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  name: string;
}
