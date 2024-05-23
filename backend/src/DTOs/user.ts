import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class UserDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Length(5, 30)
  @IsNotEmpty()
  @IsString()
  login: string;

  @Length(6, 140)
  @IsNotEmpty()
  @IsString()
  password: string;
}
