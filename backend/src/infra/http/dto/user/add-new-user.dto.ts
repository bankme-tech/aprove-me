import { IsString, Length } from 'class-validator';

export class AddNewUserDTO {
  @Length(0, 140)
  @IsString()
  login: string;

  @Length(0, 140)
  @IsString()
  password: string;
}
