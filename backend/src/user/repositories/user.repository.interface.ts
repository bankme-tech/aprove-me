import { CreateUserInputDTO } from '../dto/create-user.input.dto';
import { CreateUserOuputDTO } from '../dto/create-user.output.dto';

export abstract class IUserRepository {
  abstract save(createUserDTO: CreateUserInputDTO): Promise<CreateUserOuputDTO>;
}
