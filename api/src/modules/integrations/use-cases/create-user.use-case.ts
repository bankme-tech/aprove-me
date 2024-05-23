import { IUseCase } from '@/core/use-cases/interfaces';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../domain/repositories/users.repository';
import { CreateUserDto } from '../infra/http/dtos/create-user.dto';
import { User } from '../domain/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { LoginAlreadyExistsError } from './errors/login-already-exists.error';

@Injectable()
export class CreateUserUseCase implements IUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

  public async execute(createUserDto: CreateUserDto) {
    const loginAlreadyExists = await this.usersRepository.findByLogin(
      createUserDto.login,
    );

    if (loginAlreadyExists) {
      throw new LoginAlreadyExistsError();
    }

    const password = await bcrypt.hash(
      createUserDto.password,
      this.configService.get('cryptRounds') as number,
    );

    const user = new User({
      login: createUserDto.login,
      password,
    });

    return await this.usersRepository.save(user);
  }
}
