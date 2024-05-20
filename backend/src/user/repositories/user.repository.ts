import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export default abstract class UserRepository {
  abstract findByLogin(login: string): Promise<User>;
  abstract create(data: CreateUserDto): Promise<User>;
}
