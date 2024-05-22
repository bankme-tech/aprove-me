import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Role } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsUUID()
  assignorId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsString()
  password: string;
}
