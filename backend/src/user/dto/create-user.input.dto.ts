import { PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class CreateUserInputDTO extends PickType(UserEntity, [
  'login',
  'password',
]) {
  @IsString({ message: 'Login must be a string' })
  public login: string;

  @IsString({ message: 'Password must be a string' })
  public password: string;
}
