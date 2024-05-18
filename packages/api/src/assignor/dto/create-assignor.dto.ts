import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAssignorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  document: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string;
}
