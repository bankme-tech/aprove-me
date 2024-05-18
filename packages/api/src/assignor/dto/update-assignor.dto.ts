import { IsString, MaxLength } from 'class-validator';

export class UpdateAssignorDto {
  @IsString()
  @MaxLength(140)
  name?: string;

  @IsString()
  @MaxLength(140)
  email?: string;

  @IsString()
  @MaxLength(30)
  document?: string;

  @IsString()
  @MaxLength(20)
  phone?: string;
}
