import { CreateUserDto } from 'src/domain/dtos/create-user';
import { User } from 'src/domain/entities';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findByUsername(username: string): Promise<User | null>;
}
