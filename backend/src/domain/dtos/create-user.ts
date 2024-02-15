import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 30)
  username: string;

  @IsString()
  @Length(6)
  password: string;
}
