import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
