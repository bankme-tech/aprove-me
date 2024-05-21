import { IsString, Length } from 'class-validator';

export class loginUserDTO {
  @Length(3, 140)
  @IsString()
  login: string;

  @IsString()
  @Length(3, 140)
  password: string;
}
