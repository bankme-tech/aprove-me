import { IsNotEmpty, IsUUID, IsString, Length } from 'class-validator';

export class AssignorDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Length(5, 30)
  @IsNotEmpty()
  @IsString()
  document: string;

  @Length(5, 140)
  @IsNotEmpty()
  @IsString()
  email: string;

  @Length(5, 20)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Length(5, 140)
  @IsNotEmpty()
  @IsString()
  name: string;
}
