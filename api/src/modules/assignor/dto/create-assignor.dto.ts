import { IsNotEmpty, IsString, Max } from 'class-validator';

export class CreateAssignorDTO {
  id: string;

  @IsString()
  @Max(140)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Max(30)
  @IsNotEmpty()
  document: string;

  @IsString()
  @Max(140)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Max(20)
  @IsNotEmpty()
  phone: string;
}
