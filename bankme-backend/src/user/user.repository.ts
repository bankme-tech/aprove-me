import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly db: DbService) {}

  async create(dto: CreateUserDto) {
    const { login, password } = dto;

    return this.db.user.create({
      data: { login, password },
    });
  }

  async findByLogin(login: string) {
    return this.db.user.findUnique({ where: { login } });
  }
}
