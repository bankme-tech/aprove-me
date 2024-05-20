import { User } from '../entities/user.entity';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto extends User {
  @IsString()
  @MinLength(4, {
    message: 'Password must be at least 4 characters long',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;

  @IsString()
  @IsNotEmpty({
    message: 'Login is required',
  })
  login: string;
}
