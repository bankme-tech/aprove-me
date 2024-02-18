import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserValidationError } from '../constants/validation-error';

export class CreateUserDTO {
  @IsNotEmpty({ message: UserValidationError.USERNAME_REQUIRED })
  @MaxLength(50, { message: UserValidationError.USERNAME_MAX_50_ERROR })
  @MinLength(3, { message: UserValidationError.USERNAME_MIN_3_ERROR })
  @IsString({ message: UserValidationError.USERNAME_INVALID })
  username: string;

  @IsNotEmpty({ message: UserValidationError.PASSWORD_REQUIRED })
  password: string;
}

export class AuthenticateDTO {
  @IsNotEmpty({ message: UserValidationError.USERNAME_REQUIRED })
  @IsString({ message: UserValidationError.USERNAME_INVALID })
  username: string;

  @IsNotEmpty({ message: UserValidationError.PASSWORD_REQUIRED })
  password: string;
}
