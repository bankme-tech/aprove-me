import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
