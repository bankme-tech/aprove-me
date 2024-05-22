import { IsString, Length } from 'class-validator';

export class AddNewUserDTO {
  @IsString()
  @Length(3, 140)
  login: string;

  @IsString()
  @Length(3, 140)
  password: string;
}
