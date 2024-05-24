import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateAssignorDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  document: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 140)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 140)
  name: string;
}
