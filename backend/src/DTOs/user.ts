import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {
  id: number;

  @Length(5, 30)
  @IsNotEmpty()
  @IsString()
  login: string;

  @Length(6, 140)
  @IsNotEmpty()
  @IsString()
  password: string;
}
