import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Role } from '../entities/user.entity';

export class SafeUserDto {
  @IsOptional()
  @IsUUID()
  assignorId?: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsString()
  username: string;
}
