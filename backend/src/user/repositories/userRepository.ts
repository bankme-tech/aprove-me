import { User } from '@prisma/client';
import { CreateUserDTO } from '../dto/create-user.dto';

export default abstract class UserRepository {
  abstract findByLogin(login: string): Promise<User>;
  abstract create(createUserDTO: CreateUserDTO): Promise<User>;
}
