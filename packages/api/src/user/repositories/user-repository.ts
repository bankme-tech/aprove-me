import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export abstract class UserRepository {
  abstract findByLogin(login: string): Promise<User>;
  abstract create(createUserDto: CreateUserDto): Promise<{ id: string; login: string }>;
}
