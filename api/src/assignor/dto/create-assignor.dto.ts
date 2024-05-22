import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAssignorDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsEmail()
  @MaxLength(140)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  name: string;
}
