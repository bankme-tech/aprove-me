import { IsNotEmpty, IsOptional, IsUUID, MaxLength } from 'class-validator';

export class AssignorDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @MaxLength(30)
  @IsNotEmpty()
  document: string;

  @MaxLength(140)
  @IsNotEmpty()
  email: string;

  @MaxLength(20)
  @IsNotEmpty()
  phone: string;

  @MaxLength(140)
  @IsNotEmpty()
  name: string;
}

export class UpdateAssignorDto {
  @IsOptional()
  @MaxLength(30)
  @IsNotEmpty()
  document?: string;

  @IsOptional()
  @MaxLength(140)
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @MaxLength(20)
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @MaxLength(140)
  @IsNotEmpty()
  name?: string;
}
