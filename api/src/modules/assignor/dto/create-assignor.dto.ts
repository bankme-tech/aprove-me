import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAssignorDTO {
  @IsString()
  @MaxLength(140)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  document: string;

  @IsString()
  @MaxLength(140)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  phone: string;
}
