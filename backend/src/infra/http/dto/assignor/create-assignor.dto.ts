import { IsEmail, IsString, Max } from 'class-validator';

export class CreateAssignorDTO {
  @Max(140)
  @IsString()
  name: string;

  @Max(20)
  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @Max(30)
  @IsString()
  document: string;
}
