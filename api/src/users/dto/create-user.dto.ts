import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'O nome é obrigatório',
  })
 
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'O email é obrigatório',
  })

  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'A senha é obrigatória',
  })
  @MinLength(6)
  password: string;

  salt: string;
}