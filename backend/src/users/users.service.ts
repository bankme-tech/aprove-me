import { Injectable } from '@nestjs/common';
import UserRepository from './repositories/userRepository';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  create(createUserDTO: CreateUserDTO) {
    return this.userRepository.create(createUserDTO);
  }
}
