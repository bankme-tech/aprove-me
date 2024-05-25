import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
