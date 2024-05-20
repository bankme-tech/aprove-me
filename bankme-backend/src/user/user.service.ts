import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/user.dto';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(dto: CreateUserDto) {
    const { login, password } = dto;
    const passwordHash = await this.cryptoService.hash(password, 10);

    const createdUser = await this.repository.create({
      login,
      password: passwordHash,
    });

    return createdUser.id;
  }

  async findByLogin(login: string) {
    return this.repository.findByLogin(login);
  }
}
