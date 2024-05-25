import { Injectable } from '@nestjs/common';
import { IUserRepository } from './repositories/user.repository.interface';
import { CreateUserOuputDTO } from './dto/create-user.output.dto';
import { CreateUserInputDTO } from './dto/create-user.input.dto';
import { IUserEncrypter } from './encrypters/user.encrypter.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly encrypter: IUserEncrypter,
    private readonly userRepository: IUserRepository,
  ) {}

  async create(
    createUserInputDTO: CreateUserInputDTO,
  ): Promise<CreateUserOuputDTO> {
    const hashedPassword = await this.encrypter.hash(
      createUserInputDTO.password,
    );

    const user = await this.userRepository.save({
      login: createUserInputDTO.login,
      password: hashedPassword,
    });

    return {
      id: user.id,
      login: user.login,
    };
  }
}
