import { Injectable } from '@nestjs/common';
import UserRepository from './repositories/userRepository';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findByLogin(login: string) {
    return this.userRepository.findByLogin(login);
  }

  create(createUserDTO: CreateUserDTO) {
    return this.userRepository.create(createUserDTO);
  }
}
