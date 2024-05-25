import { PrismaService } from 'src/persistence/prisma.service';
import { CreateUserInputDTO } from '../dto/create-user.input.dto';
import { IUserRepository } from './user.repository.interface';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { IUserMapper } from '../mappers/user.mapper.interface';
import { User } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: IUserMapper<User>,
  ) {}

  async save(createUserDTO: CreateUserInputDTO): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        login: createUserDTO.login,
        password: createUserDTO.password,
      },
    });

    return this.mapper.toDomainEntity(user);
  }
}
