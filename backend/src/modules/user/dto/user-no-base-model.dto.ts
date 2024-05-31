import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserNoBaseModelDto extends OmitType(UserDto, ['id'] as const) {}

export type UserNoBaseModel = Omit<UserDto, 'id'>;
