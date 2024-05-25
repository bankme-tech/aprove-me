import { CreateUserInputDTO } from '../dto/create-user.input.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract save(createUserDTO: CreateUserInputDTO): Promise<UserEntity>;
  abstract findByLogin(login: string): Promise<UserEntity>;
}
